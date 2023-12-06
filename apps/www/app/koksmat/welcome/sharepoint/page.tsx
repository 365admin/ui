"use client"

import React, { useContext, useMemo, useState } from "react"
import Link from "next/link"

import { CardContent, CardHeader, CardTitle } from "@/registry/default/ui/card"
import { Badge } from "@/registry/new-york/ui/badge"
import { Button } from "@/registry/new-york/ui/button"
import { Card, CardFooter } from "@/registry/new-york/ui/card"
import { KoksmatContext } from "@/app/koksmat/context"
import RunServerProcess from "@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess"
import { MagicboxContext } from "@/app/magicbox-context"

import { AzContext, AzDomain } from "../../components/az-schema"
import { AzureContext } from "../../components/azureContext"
import { AzureDomain } from "../../components/azureDomains"
import { PowerShell } from "../../components/powershell"
import { SharePointContext } from "../../components/sharepointContext"
import { PageContextSectionHeader } from "../../tenants/[tenant]/site/[site]/components/page-section-header"
import { MessageType } from "../../tenants/[tenant]/site/[site]/server/MessageType"
import { WelcomeContext } from "../context"

export default function Connections() {
  const [siginUrl, setsiginUrl] = useState("https://microsoft.com/devicelogin")
  const [signinCode, setsigninCode] = useState("")
  const [accessChecked, setaccessChecked] = useState(false)
  const [hasSharePointAccess, sethasSharePointAccess] = useState(false)
  const [azureContext, setazureContext] = useState<AzContext.Root>()
  const [error, seterror] = useState("")
  const [createPnpApp, setcreatePnpApp] = useState(false)
  const { setOptions, options } = useContext(KoksmatContext)
  const { showDebug, showContext } = options
  const magicbox = useContext(MagicboxContext)
  const [adminurl, setadminurl] = useState("")
  const welcomeContext = useContext(WelcomeContext)
  const [domains, setdomains] = useState<AzDomain.Root>()
  const [tenantselected, settenantselected] = useState("")
  const onMessage = (msg: MessageType) => {
    if (msg.isError) return

    if (msg.message.includes("enter the code")) {
      const code =
        msg.message.split("enter the code ")[1].split(" to authenticate")[0] ??
        ""
      setsigninCode(code)
    }

    console.log(msg)
  }
  const onAzMessage = (msg: MessageType) => {
    if (msg.message.includes("enter the code")) {
      const code =
        msg.message.split("enter the code ")[1].split(" to authenticate")[0] ??
        ""
      setsigninCode(code)
    }

    console.log(msg)
  }
  return (
    <div>
      <div>
        <PageContextSectionHeader title={"Connect to SharePoint"} />
        <div className="mb-3 mr-8">
          <div className="mt-3">
            SharePoint is considered the Primary data store for everything we
            do. So you need to establish a connection.
          </div>
          <div className="mt-3">
            This is done using the{" "}
            <a
              className="text-blue-700"
              target="_blank"
              href="https://learn.microsoft.com/en-us/powershell/sharepoint/sharepoint-pnp/sharepoint-pnp-cmdlets"
            >
              PnP PowerShell module
            </a>
          </div>
        </div>
        {!domains && <div className="italic">
          Reading domains from Azure
          </div>}
        {!welcomeContext.tenant && (
          <div>
           
            <AzureDomain
              onData={(data) => {
                setdomains(data)
              }}
            />
          </div>
        )}
        {!tenantselected && domains && (
          <div>
            <Card>
              <CardHeader>
                <CardTitle> Select the SharePoint domain that you like to use</CardTitle>
                </CardHeader>
                <CardContent>
          
            <table className="mt-4">
              <tr>
                <td className="font-bold">Tenant</td>
                <td className="ml-5 font-bold">SharePoint domain</td>
              </tr>
              {domains
                .sort((a, b) => {
                  return a.Name.localeCompare(b.Name)
                })
                .map((domain) => {
                  return (
                    <tr key={domain.Id}>
                      <td>{domain.Name}</td>
                      <td>
                        <div className="flex">
                        {(
                          domain.Domains.filter(
                            (d) =>
                              d.toLowerCase().indexOf("onmicrosoft.com") > -1
                          ).filter(
                            (d) =>
                              d
                                .toLowerCase()
                                .indexOf("mail.onmicrosoft.com") === -1
                          ) ?? []
                        ).map((d) => {
                          return (
                            <div key={d} className="space-3 p-3">
                              <Button
                                variant={"default"}
                                onClick={() =>{
                                  settenantselected(d.split(".")[0].toLowerCase())
                                  welcomeContext.settenant(
                                    d.split(".")[0].toLowerCase()
                                  )}
                                }
                              >
                                {d.split(".")[0].toLowerCase()}
                              </Button>
                            </div>
                          )
                        })}</div>
                      </td>
                    </tr>
                  )
                })}
            </table>
            </CardContent>
            </Card>
          </div>
          
        )}

        {tenantselected && (
          <Card className="mr-8">
            <CardHeader title="Access Check" />
            <CardContent>
              {!accessChecked && (
                <div>
                  <div> Checking access to SharePoint</div>
                  <div>
                    {" "}
                    <SharePointContext
                      onError={(error) => {
                        seterror(error)
                        sethasSharePointAccess(false)
                        setaccessChecked(true)
                      }}
                      onData={(url) => {
                        setaccessChecked(true)
                        sethasSharePointAccess(url !== "")
                        setadminurl(url)
                      }}
                      tenant={welcomeContext.tenant}
                    />
                  </div>
                </div>
              )}
              {error && <div className="text-red-600"> {error}</div>}

              {accessChecked && hasSharePointAccess && (
                <div>
                  Access to SharePoint looks good, this should be the App
                  Catalogue.{" "}
                  <a className="text-blue-700" href={adminurl} target="_blank">
                    {adminurl}
                  </a>
                 
                </div>
              )}
            </CardContent>
            <CardFooter>
              {signinCode && (
                <div>
                  <div>
                    <Button variant="default">
                      <Link href={siginUrl} target="_blank">
                        Copy the code above, then click here
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
              {hasSharePointAccess && (
                <div>
                <Button>
                  <Link
                    href={
                      "/koksmat/welcome/sharepoint/deploy/" +
                      welcomeContext.tenant
                    }
                  >
                    Continue
                  </Link>
                </Button>
               
            
                  <Button
                    variant={"secondary"}
                    onClick={() => {
                      sethasSharePointAccess(false)
                      
                      setaccessChecked(false)
                      settenantselected("")}}
                  >
                    Change tenant
                  </Button>
         
                </div>
              )}
            </CardFooter>
          </Card>
        )}
        
      </div>
      
    </div>
  )
}
