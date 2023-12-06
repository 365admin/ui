"use client"

import React, { useContext, useMemo, useState } from "react"

import { WelcomeContext } from "../../../context"
import { PageContextSectionHeader } from "@/app/koksmat/tenants/[tenant]/site/[site]/components/page-section-header"
import { SharePointKoksmatContext } from "@/app/koksmat/components/sharepointKoksmatContext"
import { set } from "date-fns"
import { CardContent, CardHeader } from "@/registry/default/ui/card"
import { Card } from "@/registry/new-york/ui/card"


export default function DeployKoksmat(props:{params:{tenant:string}}) {
 const [siteTitle, setsiteTitle] = useState("")
  const [siteUrl, setsiteUrl] = useState("")
 
  return (
    <div>
      <div>
        <PageContextSectionHeader title={"Install Koksmat"} />

        <Card className="mr-8">
          <CardHeader title="Install Koksmat" />
          <CardContent>
          <div className="mb-3 mr-8">
          <div className="mt-3">
            {siteUrl && 
            <div>
              <div>
              Site exists: {siteTitle} 
              </div>
              <div>
              <a      className="text-blue-700" href={siteUrl} target="_blank">{siteUrl}</a>
              </div>
              </div>
            }
           <SharePointKoksmatContext tenant={props.params.tenant}
           onData={(d)=>{
            debugger
            setsiteTitle(d.Title)
            setsiteUrl(d.webUrl)
           }} />
          </div>
         
        </div>
          </CardContent>
        </Card>
        


      </div>
    </div>
  )
}
