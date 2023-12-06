import { connect } from "@/lib/mongodb";
import { getSpAuthToken } from "@/lib/officegraph";
import { httpsGetAll } from "@/lib/httphelper";
export interface Root {
  "@odata.context": string
  "@microsoft.graph.tips": string
  value: Value[]
}

export interface Value {
  "@odata.etag": string
  createdDateTime: string
  eTag: string
  id: string
  lastModifiedDateTime: string
  webUrl: string
  createdBy: CreatedBy
  lastModifiedBy: LastModifiedBy
  parentReference: ParentReference
  contentType: ContentType
  "fields@odata.context": string
  fields: Fields
}

export interface CreatedBy {
  user: User
}

export interface User {
  email: string
  id: string
  displayName: string
}

export interface LastModifiedBy {
  user: User2
}

export interface User2 {
  email: string
  id: string
  displayName: string
}

export interface ParentReference {
  id: string
  siteId: string
}

export interface ContentType {
  id: string
  name: string
}

export interface Fields {
  "@odata.etag": string
  Title: string
  LinkTitle: string
  Welcomeprompt?: string
  Sitename?: string
  TrackingCode: string
  id: string
  ContentType: string
  Modified: string
  Created: string
  AuthorLookupId: string
  EditorLookupId: string
  _UIVersionString: string
  Attachments: boolean
  Edit: string
  LinkTitleNoMenu: string
  ItemChildCount: string
  FolderChildCount: string
  _ComplianceFlags: string
  _ComplianceTag: string
  _ComplianceTagWrittenTime: string
  _ComplianceTagUserId: string
}


export const KEY = "configcache"
export const DB = "magicbox"
export interface ConfigCache {
  date: Date
  key: string
  hostdata: Fields
}
const defaultConfig: ConfigCache = {
  date: new Date(),
  key:"default",
  hostdata: {
    "@odata.etag": "",
    Title: "Unknown host",
    LinkTitle: "",
    TrackingCode: `
          
    (function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "ixwytyo6af");
`,
    id: "",
    ContentType: "",
    Modified: "",
    Created: "",
    AuthorLookupId: "",
    EditorLookupId: "",
    _UIVersionString: "",
    Attachments: false,
    Edit: "",
    LinkTitleNoMenu: "",
    ItemChildCount: "",
    FolderChildCount: "",
    _ComplianceFlags: "",
    _ComplianceTag: "",
    _ComplianceTagWrittenTime: "",
    _ComplianceTagUserId: ""
  }
};
export async function readConfigData(key: string, hostname: string) {


  const accessToken = await getSpAuthToken();
  const getHostResponse = await httpsGetAll<Value>(accessToken,
    `https://graph.microsoft.com/v1.0/sites/christianiabpos.sharepoint.com:/sites/intra365:/lists/Hosts/items?$expand=fields`);

  if (getHostResponse.hasError) {
    console.log("Error getting hosts", getHostResponse.errorMessage);
    return defaultConfig;
  }

  const hostdata = (getHostResponse.data ?? []).find((host: Value) => host.fields.Title.toLowerCase() === hostname.toLowerCase());




  const cache: ConfigCache = {
    date: new Date(),
    key,
    hostdata: hostdata?.fields ?? defaultConfig.hostdata
  };
  return cache;
}
export async function refreshConfigCache(key: string, hostname: string) {
 
  console.log("Refreshing Config cache");
  const client = await connect();
  const cache = await readConfigData(key, hostname);

  await client
    .db(DB)
    .collection<ConfigCache>("cache")
    .deleteMany({ key });

  await client
    .db(DB)
    .collection<ConfigCache>("cache")
    .insertOne(cache);

  await client.close();
  return cache;
}

export async function getConfigCache(host: string) {
  return  {
    date: new Date(),
    key:"default",
    hostdata: defaultConfig.hostdata
  };
// return 
//   const client = await connect();
//   const key = KEY + ":" + host;
//   let cache = await client
//     .db(DB)
//     .collection<ConfigCache>("cache")
//     .findOne({ key });

//   if (cache) {
//     const now = new Date();
//     const diff = now.getTime() - cache.date.getTime();
//     const diffInMinutes = Math.round(diff / 60000);
//     if (diffInMinutes > 1) {
//       await refreshConfigCache(key, host);
//       cache = await client
//         // eslint-disable-next-line turbo/no-undeclared-env-vars
//         .db(process.env.DATABASE)
//         .collection<ConfigCache>("cache")
//         .findOne({ key });
//     }
//   } else {
//     await refreshConfigCache(key, host);
//     cache = await client
//       // eslint-disable-next-line turbo/no-undeclared-env-vars
//       .db(process.env.DATABASE)
//       .collection<ConfigCache>("cache")
//       .findOne({ key });
//   }

//   await client.close();
//   return cache;
}
