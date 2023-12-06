import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureADProvider from "./auth-azuread";
import { MongoDBAdapter } from "./mongodb/nextauth-mongoadapter"
import { MongoClient, ObjectId } from "mongodb";
import { AdapterUser } from "next-auth/adapters";
import { https } from "./httphelper";
import { get } from "http";
import { connect } from "./mongodb";
import { Mutex, MutexInterface, Semaphore, SemaphoreInterface, withTimeout } from 'async-mutex';

const options = {};
export interface AccountObject {
  _id: Id;
  provider: string;
  type: string;
  providerAccountId: string;
  token_type: string;
  scope: string;
  expires_at: number;
  ext_expires_in: number;
  access_token: string;
  refresh_token: string;
  id_token: string;
  session_state: string;
  userId: Id;
}

export interface Id {
  '$oid': string;
}

export interface RefreshResult {accessToken:string,accessTokenExpires:number,error:string}

async function getAccessToken(userId: string): Promise<{ access_token: string, expire: number, error: string }> {
  /*
   * Requires the MongoDB Node.js Driver
   * https://mongodb.github.io/node-mongodb-native
   */
  //debugger
  const mutex = new Mutex();
  await mutex.waitForUnlock();
  const filter = {
    '$and': [
      {
        'provider': 'azure-ad'
      }, {
        'userId': new ObjectId(userId)
      }
    ]
  };

  const client = await connect()
  const coll = client.db('nextauth').collection('accounts');
  const cursor = coll.find<AccountObject>(filter);
  const result = await cursor.toArray();
  await client.close();
  if (result.length < 1) {
    return { "error": "no account found", access_token: "", expire: 0 }

  }

  if (result[0].expires_at > Date.now()) {

    return { "error": "", access_token: result[0].access_token, expire: result[0].expires_at }
  }
  /**
* Takes a token, and returns a new token with updated
* `accessToken` and `accessTokenExpires`. If an error occurs,
* returns the old token and an error property
*/
  async function refreshAccessToken(refreshToken: string) : Promise<RefreshResult> {
    try {

      const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=refresh_token`
          + `&client_secret=${process.env.AZURE_AD_CLIENT_SECRET as string}`
          + `&refresh_token=${refreshToken}`
          + `&client_id=${process.env.AZURE_AD_CLIENT_ID as string}`
      })


      const refreshedTokens = await response.json()

      if (!response.ok) {
        throw refreshedTokens
      }
      const client = await connect()
      const coll = client.db('nextauth').collection('accounts');
      const cursor = coll.find<AccountObject>(filter);
      const result = await cursor.toArray();
   
      await coll.updateOne({ _id: result[0]._id }, { $set: { access_token: refreshedTokens.access_token, expires_at: Date.now() + refreshedTokens.expires_in * 1000 } })
      await client.close();
      const refreshResult : RefreshResult = {
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
        error: ""
      }
      return refreshResult
    } catch (error) {
      console.log(error)

      return {
        accessToken: "",
        accessTokenExpires: 0,
        error: "RefreshAccessTokenError",
      }
    }
  }


  console.log("Exclusive call to refresh token")
  const { accessToken, accessTokenExpires, error } = await mutex.runExclusive<RefreshResult>(async () => {

     return refreshAccessToken(result[0].refresh_token)
   
  })

  if (error) {
    console.log("Exclusive call to refresh token, done with ERROR",error)
    return { "error": error, access_token: "", expire: 0 }
  }
  console.log("Exclusive call to refresh token SUCCESSED")
  return { "error": "", access_token: accessToken, expire: accessTokenExpires }
}


const USERINFOURL = "https://graph.microsoft.com/v1.0/me?$select=id,userPrincipalName,accountEnabled,userType,givenName,surname"

const getOptions = (): NextAuthOptions => {

  let client;
  let clientPromise: Promise<MongoClient>;

  const uri = (process.env.MONGODB as string)
  client = new MongoClient(uri, options);
  clientPromise = client.connect();

  return {
    session: {
      strategy: "database",
    },
    secret: process.env.SECRET,
    debug: false,
    callbacks: {



      session: async ({ session, token, user }: { session: any, token: any, user: AdapterUser }) => {

        //console.log("session callback", session.user?.name, session.accessTokenExpires, session.accessToken ? " has token" : "no token")
        if (user) {


          session.roles = (user as any).roles
          const { access_token, expire, error } = await getAccessToken(user.id)
          if (error) {
            console.log("auth", "no access token found", error)
            throw new Error(error);

          }
          session.accessToken = access_token
          session.accessTokenExpires = expire

        }

        return session
      }
    },

    providers: [


      AzureADProvider({
        clientId: process.env.AZURE_AD_CLIENT_ID as string,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
        tenantId: process.env.AZURE_AD_TENANT_ID as string,

        userinfo: {
          url: USERINFOURL,

          async request(context) {

            const response = await https(context?.tokens?.access_token as string, "GET", USERINFOURL)


            const newProfile: any = response.data

            return {
              profileId: newProfile.id,
              id: newProfile.id,
              email: newProfile.userPrincipalName,
              firstName: newProfile.givenName,
              lastName: newProfile.surname,
              userType: newProfile.userType,
              accountStatus: newProfile.accountEnabled
            };
          }

        },

        async profile(userinfo, tokens) {

          const response = await fetch(
            `https://graph.microsoft.com/v1.0/me/photos/${48}x${48}/$value`,
            { headers: { Authorization: `Bearer ${tokens.access_token}` } }
          )

          // Confirm that profile photo was returned
          let image
          // TODO: Do this without Buffer
          if (response.ok && typeof Buffer !== "undefined") {
            try {
              const pictureBuffer = await response.arrayBuffer()
              const pictureBase64 = Buffer.from(pictureBuffer).toString("base64")
              image = `data:image/jpeg;base64, ${pictureBase64}`
            } catch { }
          }


          var roles: [] = []
          if (tokens?.id_token) {
            const [header, payload, sig] = tokens.id_token.split('.')
            const idToken = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
            roles = idToken.roles
          }
          return {
            id: userinfo.id,
            name: userinfo.firstName + " " + userinfo.lastName,
            email: userinfo.email,
            image: image ?? null,
            // accessToken : tokens?.access_token,
            // accessTokenExpires : (tokens?.expires_at as number) * 1000,
            roles: roles,
          };
        },
        authorization: {
          params: {
            scope: "openid offline_access User.Read ",
          },
        }
      }),


    ],
    adapter: MongoDBAdapter(clientPromise, { databaseName: "nextauth" })
  };

}
// will not have been set during build on CI server 
// eslint-disable-next-line turbo/no-undeclared-env-vars
export const authOptions: NextAuthOptions = process.env.MONGODB ? getOptions() : {} as NextAuthOptions