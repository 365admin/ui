"use client"

import React, { useContext, useMemo, useState } from "react"

import RunServerProcess from "@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess"
import { KoksmatContext } from "@/app/koksmat/context"
import { MagicboxContext } from "@/app/magicbox-context"

export function ConnectToSharePoint() {
  const koksmat = useContext(KoksmatContext)
  const magicbox = useContext(MagicboxContext)

  return (
    <div>
      {koksmat.currentKitchen && (
        <div>
          <RunServerProcess
            
            caption="Reading SharePoint site info"
            cmd={"pwsh"}
            args={[
              magicbox.root + `app/koksmat/powershell/get-site.ps1`,
              "-tenantdomain",
              koksmat.tenant,
              "-siteurl",
              `https://${koksmat.tenant}.sharepoint.com/sites/${koksmat.site}`,
            ]}
            timeout={3600}
            channelname={"git"}
            cwd={koksmat.currentKitchen.cwd}
          />
        </div>
      )}{" "}
    </div>
  )
}
