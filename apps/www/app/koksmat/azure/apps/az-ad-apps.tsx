import { useProcess } from "@/lib/useprocess"
import { useEffect, useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/registry/new-york/ui/badge"
  import { Button } from "@/registry/new-york/ui/button"
import { PopUp } from "../../tenants/[tenant]/site/[site]/components/popup"
import { setSubscription } from "../../tenants/[tenant]/site/[site]/kitchen/[kitchen]/connect/server"
  


export type Root = Root2[]

export interface Root2 {
  addIns: any[]
  api: Api
  appId: string
  appRoles: AppRole[]
  applicationTemplateId?: string
  certification: any
  createdDateTime: string
  defaultRedirectUri?: string
  deletedDateTime: any
  description: any
  disabledByMicrosoftStatus: any
  displayName: string
  groupMembershipClaims?: string
  id: string
  identifierUris: string[]
  info: Info
  isDeviceOnlyAuthSupported?: boolean
  isFallbackPublicClient?: boolean
  keyCredentials: KeyCredential[]
  notes: any
  optionalClaims?: OptionalClaims
  parentalControlSettings: ParentalControlSettings
  passwordCredentials: PasswordCredential[]
  publicClient: PublicClient
  publisherDomain?: string
  requestSignatureVerification: any
  requiredResourceAccess: RequiredResourceAccess[]
  samlMetadataUrl: any
  serviceManagementReference: any
  servicePrincipalLockConfiguration?: ServicePrincipalLockConfiguration
  signInAudience: string
  spa: Spa
  tags: string[]
  tokenEncryptionKeyId: any
  verifiedPublisher: VerifiedPublisher
  web: Web
}

export interface Api {
  acceptMappedClaims: any
  knownClientApplications: any[]
  oauth2PermissionScopes: Oauth2PermissionScope[]
  preAuthorizedApplications: PreAuthorizedApplication[]
  requestedAccessTokenVersion?: number
}

export interface Oauth2PermissionScope {
  adminConsentDescription: string
  adminConsentDisplayName: string
  id: string
  isEnabled: boolean
  type: string
  userConsentDescription?: string
  userConsentDisplayName?: string
  value: string
}

export interface PreAuthorizedApplication {
  appId: string
  delegatedPermissionIds: string[]
}

export interface AppRole {
  allowedMemberTypes: string[]
  description: string
  displayName: string
  id: string
  isEnabled: boolean
  origin: string
  value?: string
}

export interface Info {
  logoUrl?: string
  marketingUrl: any
  privacyStatementUrl: any
  supportUrl: any
  termsOfServiceUrl: any
}

export interface KeyCredential {
  customKeyIdentifier: string
  displayName?: string
  endDateTime: string
  key: any
  keyId: string
  startDateTime: string
  type: string
  usage: string
}

export interface OptionalClaims {
  accessToken: AccessToken[]
  idToken: IdToken[]
  saml2Token: Saml2Token[]
}

export interface AccessToken {
  additionalProperties: any[]
  essential: boolean
  name: string
  source: any
}

export interface IdToken {
  additionalProperties: any[]
  essential: boolean
  name: string
  source: any
}

export interface Saml2Token {
  additionalProperties: string[]
  essential: boolean
  name: string
  source: any
}

export interface ParentalControlSettings {
  countriesBlockedForMinors: any[]
  legalAgeGroupRule: string
}

export interface PasswordCredential {
  customKeyIdentifier?: string
  displayName?: string
  endDateTime: string
  hint?: string
  keyId: string
  secretText: any
  startDateTime: string
}

export interface PublicClient {
  redirectUris: string[]
}

export interface RequiredResourceAccess {
  resourceAccess: ResourceAccess[]
  resourceAppId: string
}

export interface ResourceAccess {
  id: string
  type: string
}

export interface ServicePrincipalLockConfiguration {
  allProperties: boolean
  credentialsWithUsageSign: boolean
  credentialsWithUsageVerify: boolean
  identifierUris: boolean
  isEnabled: boolean
  tokenEncryptionKeyId: boolean
}

export interface Spa {
  redirectUris: string[]
}

export interface VerifiedPublisher {
  addedDateTime: any
  displayName: any
  verifiedPublisherId: any
}

export interface Web {
  homePageUrl?: string
  implicitGrantSettings: ImplicitGrantSettings
  logoutUrl?: string
  redirectUriSettings: RedirectUriSetting[]
  redirectUris: string[]
}

export interface ImplicitGrantSettings {
  enableAccessTokenIssuance: boolean
  enableIdTokenIssuance: boolean
}

export interface RedirectUriSetting {
  index?: number
  uri: string
}


function convert(data: string): Root | null {
    if (!data) return null
    return JSON.parse(data) as Root
  }
  
  export default function ListAzApplications() {
    const { isLoading, error, data } =  useProcess(
      "az",
      [ "ad","app","list","--all"],
      20,
      "echo"
    )
    const [selectedPod, setselectedPod] = useState<Root2>()
    const [showDetails, setshowDetails] = useState(false)
  const [currentSubscription, setcurrentSubscription] = useState("")
    useEffect(() => {
      if (selectedPod) {
      }
    }, [selectedPod])
  
    if (data) {
      console.log(data)
    }
    return (
      <div>
        {isLoading && <div>Loading...</div>}
  
        {error && <div className="text-red-700">{error}</div>}
        <div className=" items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-2 ">
        
          {convert(data)?.map((item: Root2) => (
              <Card key={item.id} >
                <CardHeader>
                  <CardTitle className="text-2xl">{item.displayName}</CardTitle>
                  <CardDescription>
                   {item.appId}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    {item.description}
                    {item.info.logoUrl && <img src={item.info.logoUrl} />}
                  </p>
                </CardContent>
                <CardFooter>
                  <p>
                    {" "}
                    <Button
                      onClick={() => {
                        setselectedPod(item)
                        setshowDetails(true)
                      }}
                    >
                      Details
                    </Button>
                    {/* <Button  onClick={async () => {
            await setSubscription(item.id)
            location.reload()
          }}>Set current</Button> */}
                  </p>
                </CardFooter>
              </Card>
            ))}
        </div>
        <PopUp
          show={showDetails}
          onClose={() => setshowDetails(false)}
          title={selectedPod?.displayName ?? "Details"}
          description={""}
        >
          <pre>{JSON.stringify(selectedPod,null,2)}</pre>
        </PopUp>
      </div>
    )
  }
  