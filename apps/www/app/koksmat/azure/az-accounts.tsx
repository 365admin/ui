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
import { PopUp } from "../tenants/[tenant]/site/[site]/components/popup"
import { setSubscription } from "../tenants/[tenant]/site/[site]/kitchen/[kitchen]/connect/server"
  

export type Root = Root2[]

export interface Root2 {
  cloudName: string
  homeTenantId?: string
  id: string
  isDefault: boolean
  managedByTenants?: ManagedByTenant[]
  name: string
  state: string
  tenantId: string
  user: User
}

export interface ManagedByTenant {
  tenantId: string
}

export interface User {
  name: string
  type: string
}



function convert(data: string): Root | null {
    if (!data) return null
    return JSON.parse(data) as Root
  }
  
  export default function ListAzAccounts() {
    const { isLoading, error, data } =  useProcess(
      "az",
      ["account", "list"],
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
              <Card key={item.id} className={item.isDefault?"bg-green-100":""}>
                <CardHeader>
                  <CardTitle className="text-2xl">{item.name}</CardTitle>
                  <CardDescription>
                   {item.cloudName} {item.user.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    
                  </p>
                </CardContent>
                <CardFooter>
                  <p>
                    {" "}
                    {/* <Button
                      onClick={() => {
                        setselectedPod(item)
                        setshowDetails(true)
                      }}
                    >
                      Details
                    </Button> */}
                    <Button  onClick={async () => {
            await setSubscription(item.id)
            location.reload()
          }}>Set current</Button>
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
  