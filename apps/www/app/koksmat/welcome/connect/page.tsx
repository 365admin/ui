"use client"

import React, { useContext, useMemo, useState } from "react"
import Link from "next/link"

import { CardContent, CardHeader } from "@/registry/default/ui/card"
import { Button } from "@/registry/new-york/ui/button"
import { Card, CardFooter } from "@/registry/new-york/ui/card"
import { KoksmatContext } from "@/app/koksmat/context"
import RunServerProcess from "@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess"
import { MagicboxContext } from "@/app/magicbox-context"

import { AzContext } from "../../components/az-schema"
import { AzureContext } from "../../components/azureContext"
import { PowerShell } from "../../components/powershell"
import { PageContextSectionHeader } from "../../tenants/[tenant]/site/[site]/components/page-section-header"
import { MessageType } from "../../tenants/[tenant]/site/[site]/server/MessageType"

export default function Connections() {
  const [siginUrl, setsiginUrl] = useState("https://microsoft.com/devicelogin")
  const [signinCode, setsigninCode] = useState("")
  const [accessChecked, setaccessChecked] = useState(false)
  const [hasAzAccess, sethasAzAccess] = useState(false)
  const [azureContext, setazureContext] = useState<AzContext.Root>()
  const [error, seterror] = useState("")
  const [createPnpApp, setcreatePnpApp] = useState(false)
  const { setOptions, options } = useContext(KoksmatContext)
  const { showDebug, showContext } = options
  const magicbox = useContext(MagicboxContext)

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
        <PageContextSectionHeader title={"Establish Azure Connection"} />
        <div className="mb-3 mr-8">
          <div>
            First of all we need to establish a trust between this computer and
            Microsoft Online.
          </div>
          <div className="mt-3">
            If you are not already connect, we will present you with a device
            code which you need to use for establishing the connection.
          </div>
        </div>
        <Card className="mr-8">
          <CardHeader title="Access Check" />
          <CardContent>
            {!accessChecked && <div> Checking access to Azure</div>}
            {error && <div className="text-red-600"> {error}</div>}
            <AzureContext
              onError={(error) => {
                seterror(error)
                sethasAzAccess(false)
                setaccessChecked(true)
              }}
              onData={(ctx) => {
                setazureContext(ctx)
                setaccessChecked(true)
                sethasAzAccess(ctx.Account.Id != "")
              }}
            />
            {accessChecked && hasAzAccess && (
              <div>
                Access to Azure looks good. You are signed in as{" "}
               <span className="font-bold"> {azureContext?.Account.Id}</span>
              
              </div>
            )}
            {accessChecked && !hasAzAccess && (
              // Try to login
              <RunServerProcess
                caption="Login to AZ"
                onMessage={onAzMessage}
                cmd={"pwsh"}
                args={[
                  "-File",
                  magicbox.root + "app/koksmat/powershell/connect-azure.ps1",
                ]}
                timeout={120}
                channelname={"az"}
              />
            )}
            {/* <Button
            className="mb-3"
            disabled={createPnpApp}
            onClick={() => {
              setcreatePnpApp(true)
            }}
          >
            Register Application in Microsoft Entra ID
          </Button> */}
            {signinCode && (
              <div>
                {/* <div className="mb-3">
            Copy this, you will be asked to enter that code in the browser when you click the link below
          </div> */}
                <div className="mt-[15px]">
                  <textarea style={{ fontSize: "20px", borderWidth: 0 }}>
                    {signinCode}
                  </textarea>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="space-x-3">
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
            {hasAzAccess && (
              <Button>
                <Link href="/koksmat/welcome/sharepoint">Continue</Link>
              </Button>
            )}{accessChecked && hasAzAccess && (
         
                <Button
                  variant={"secondary"}
                  onClick={() =>
                    sethasAzAccess(false) 
                  }
                >
                  Reconnect
                </Button>
              
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
