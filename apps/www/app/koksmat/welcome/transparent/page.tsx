"use client"

import React, { useContext, useMemo, useState } from "react"
import Link from "next/link"

import { CardContent, CardFooter } from "@/registry/default/ui/card"
import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { KoksmatContext } from "@/app/koksmat/context"

import { PowerShell } from "../../components/powershell"
import { PageContextSectionHeader } from "../../tenants/[tenant]/site/[site]/components/page-section-header"
import ListAzAccounts from "../az-accounts"

export default function AzSubscriptions() {
  const [tryDebug, settryDebug] = useState(false)
  const { setOptions, options } = useContext(KoksmatContext)
  const { showDebug, showContext } = options
  const [answer, setanswer] = useState("?")
  return (
    <div>
      <PageContextSectionHeader title={"Transparency"} />
      <div>
        We really like you to trust this tool. So all places where is make sense
        and is possible you have the options for checking out which scripts are
        getting executed and what they are doing. This can be done in place. If
        you or your cyber security guys like to see the code, you can find it on
        GitHub. &nbsp;
        <a
          className="text-blue-700"
          target="_blank"
          href="https://github.com/koksmat-com"
        >
          https://github.com/koksmat-com
        </a>
        .
      </div>
      <div className="my-3">
        <div>
          <div className="mb-3">
            When you turn on debug, you will see the options to show the
            Terminal output of any component executing script on your machine.
          </div>
          <Button
            className="mb-4"
            variant={"default"}
            onClick={() => {
              settryDebug(true)
              setOptions({ showDebug: !showDebug, showContext })
            }}
          >
            {showDebug
              ? "Turn off"
              : !tryDebug
              ? "Click here to turn on debug"
              : "Turn on debug"}
          </Button>{" "}
          {showDebug && (
            <span>
              Then try to click the{" "}
              <span className="font-bold text-yellow-800">
                {" "}
                Show Terminal button
              </span>{" "}
              in the PowerShell example below.
            </span>
          )}
        </div>
      </div>
      <Card className="mr-8 mt-4">
        <CardHeader>
          {/* <CardTitle>PowerShell Example</CardTitle> */}
        </CardHeader>
        <CardContent className="px-8">
          <div className="font-mono text-2xl">What is 1+2? </div>
          <div className="mt-3 font-mono text-2xl">
            Server answers: <span className="font-bold">{answer}</span>
          </div>
          <div className="mt-4">
            <PowerShell<any>
              script={`  
    Write-Host (1+2)
    `}
              onData={(data) => {
                setanswer(data)
              }}
              onError={() => {}}
            />
            {/* <RunServerProcess cmd={'pwsh'} args={["/Users/nielsgregersjohansen/kitchens/noma/get-site-allpages-test.ps1","-siteurl","https://christianiabpos.sharepoint.com/sites/nexiintra-hub"]} timeout={3600} channelname={'pwsh'}  />
             */}
          </div>
        </CardContent>
        <CardFooter></CardFooter>{" "}
      </Card>

      <div></div>
    </div>
  )
}
