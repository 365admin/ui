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
  

export type Root = Root2[]

export interface Root2 {
  aadProfile: any
  addonProfiles?: AddonProfiles
  agentPoolProfiles: AgentPoolProfile[]
  apiServerAccessProfile: any
  autoScalerProfile?: AutoScalerProfile
  autoUpgradeProfile: any
  azureMonitorProfile: any
  azurePortalFqdn: string
  creationData: any
  currentKubernetesVersion: string
  disableLocalAccounts: boolean
  diskEncryptionSetId: any
  dnsPrefix: string
  enableNamespaceResources: any
  enablePodSecurityPolicy: boolean
  enableRbac: boolean
  extendedLocation: any
  fqdn: string
  fqdnSubdomain: any
  guardrailsProfile: any
  httpProxyConfig: any
  id: string
  identity: Identity2
  identityProfile: IdentityProfile
  ingressProfile: any
  kubernetesVersion: string
  linuxProfile: LinuxProfile
  location: string
  maxAgentPools: number
  name: string
  networkProfile: NetworkProfile2
  nodeResourceGroup: string
  nodeResourceGroupProfile: any
  oidcIssuerProfile: OidcIssuerProfile
  podIdentityProfile: any
  powerState: PowerState2
  privateFqdn: any
  privateLinkResources: any
  provisioningState: string
  publicNetworkAccess: any
  resourceGroup: string
  securityProfile: SecurityProfile
  serviceMeshProfile: any
  servicePrincipalProfile: ServicePrincipalProfile
  sku: Sku
  storageProfile: StorageProfile
  supportPlan: string
  systemData: any
  tags: Tags
  type: string
  upgradeSettings: any
  windowsProfile?: WindowsProfile
  workloadAutoScalerProfile: WorkloadAutoScalerProfile
}

export interface AddonProfiles {
  azureKeyvaultSecretsProvider: AzureKeyvaultSecretsProvider
}

export interface AzureKeyvaultSecretsProvider {
  config: Config
  enabled: boolean
  identity: Identity
}

export interface Config {
  enableSecretRotation: string
  rotationPollInterval: string
}

export interface Identity {
  clientId: string
  objectId: string
  resourceId: string
}

export interface AgentPoolProfile {
  availabilityZones: any
  capacityReservationGroupId: any
  count: number
  creationData: any
  currentOrchestratorVersion: string
  enableAutoScaling: boolean
  enableCustomCaTrust?: boolean
  enableEncryptionAtHost?: boolean
  enableFips: boolean
  enableNodePublicIp: boolean
  enableUltraSsd?: boolean
  gpuInstanceProfile: any
  hostGroupId: any
  kubeletConfig: any
  kubeletDiskType: string
  linuxOsConfig: any
  maxCount?: number
  maxPods: number
  messageOfTheDay: any
  minCount?: number
  mode: string
  name: string
  networkProfile?: NetworkProfile
  nodeImageVersion: string
  nodeLabels: any
  nodePublicIpPrefixId: any
  nodeTaints: any
  orchestratorVersion: string
  osDiskSizeGb: number
  osDiskType: string
  osSku: string
  osType: string
  podSubnetId: any
  powerState: PowerState
  provisioningState: string
  proximityPlacementGroupId: any
  scaleDownMode?: string
  scaleSetEvictionPolicy: any
  scaleSetPriority: any
  spotMaxPrice: any
  tags: any
  type: string
  upgradeSettings: UpgradeSettings
  vmSize: string
  windowsProfile: any
  workloadRuntime?: string
}

export interface NetworkProfile {
  allowedHostPorts: any
  applicationSecurityGroups: any
  nodePublicIpTags: any
}

export interface PowerState {
  code: string
}

export interface UpgradeSettings {
  maxSurge: any
}

export interface AutoScalerProfile {
  balanceSimilarNodeGroups: string
  expander: string
  maxEmptyBulkDelete: string
  maxGracefulTerminationSec: string
  maxNodeProvisionTime: string
  maxTotalUnreadyPercentage: string
  newPodScaleUpDelay: string
  okTotalUnreadyCount: string
  scaleDownDelayAfterAdd: string
  scaleDownDelayAfterDelete: string
  scaleDownDelayAfterFailure: string
  scaleDownUnneededTime: string
  scaleDownUnreadyTime: string
  scaleDownUtilizationThreshold: string
  scanInterval: string
  skipNodesWithLocalStorage: string
  skipNodesWithSystemPods: string
}

export interface Identity2 {
  principalId: string
  tenantId: string
  type: string
  userAssignedIdentities: any
}

export interface IdentityProfile {
  kubeletidentity: Kubeletidentity
}

export interface Kubeletidentity {
  clientId: string
  objectId: string
  resourceId: string
}

export interface LinuxProfile {
  adminUsername: string
  ssh: Ssh
}

export interface Ssh {
  publicKeys: PublicKey[]
}

export interface PublicKey {
  keyData: string
}

export interface NetworkProfile2 {
  dnsServiceIp: string
  dockerBridgeCidr: string
  ipFamilies: string[]
  kubeProxyConfig: any
  loadBalancerProfile: LoadBalancerProfile
  loadBalancerSku: string
  natGatewayProfile: any
  networkDataplane?: string
  networkMode: any
  networkPlugin: string
  networkPluginMode: any
  networkPolicy: any
  outboundType: string
  podCidr?: string
  podCidrs?: string[]
  serviceCidr: string
  serviceCidrs: string[]
}

export interface LoadBalancerProfile {
  allocatedOutboundPorts: any
  backendPoolType: string
  effectiveOutboundIPs: EffectiveOutboundIp[]
  enableMultipleStandardLoadBalancers: any
  idleTimeoutInMinutes: any
  managedOutboundIPs: ManagedOutboundIps
  outboundIPs: any
  outboundIpPrefixes: any
}

export interface EffectiveOutboundIp {
  id: string
  resourceGroup: string
}

export interface ManagedOutboundIps {
  count: number
  countIpv6: any
}

export interface OidcIssuerProfile {
  enabled: boolean
  issuerUrl: any
}

export interface PowerState2 {
  code: string
}

export interface SecurityProfile {
  azureKeyVaultKms: any
  customCaTrustCertificates: any
  defender: any
  imageCleaner: any
  nodeRestriction: any
  workloadIdentity: any
}

export interface ServicePrincipalProfile {
  clientId: string
}

export interface Sku {
  name: string
  tier: string
}

export interface StorageProfile {
  blobCsiDriver: any
  diskCsiDriver: DiskCsiDriver
  fileCsiDriver: FileCsiDriver
  snapshotController: SnapshotController
}

export interface DiskCsiDriver {
  enabled: boolean
  version: string
}

export interface FileCsiDriver {
  enabled: boolean
}

export interface SnapshotController {
  enabled: boolean
}

export interface Tags {
  Application_Service_Number: string
}

export interface WindowsProfile {
  adminPassword: any
  adminUsername: string
  enableCsiProxy: boolean
  gmsaProfile: any
  licenseType: any
}

export interface WorkloadAutoScalerProfile {
  keda: any
  verticalPodAutoscaler: any
}


function convert(data: string): Root | null {
    if (!data) return null
    return JSON.parse(data) as Root
  }
  
  export default function ListAzAksClusters() {
    const { isLoading, error, data } =  useProcess(
      "az",
      [ "aks","list"],
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
                  <CardTitle className="text-2xl">{item.name}</CardTitle>
                  <CardDescription>
                   Resource Group: {item.resourceGroup}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    
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
          title={selectedPod?.name ?? "Details"}
          description={""}
        >
          <pre>{JSON.stringify(selectedPod,null,2)}</pre>
        </PopUp>
      </div>
    )
  }
  