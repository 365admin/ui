"use client"

import { useContext } from "react"
import { MagicboxContext } from "@/app/magicbox-context"
import { PowerShell } from "./powershell"
export interface Root {
  webUrl: string
  Title: string
}

export function SharePointKoksmatContext(props: {
  tenant: string
  onData?: (data: any) => void
  onError?: (errorMessage: string) => void
}) {
  const magicbox = useContext(MagicboxContext)

  return ( 
    <div>
      
    <PowerShell<Root>
      timeout={3600}
      dontparse={false}
      script=""
      args={["-File",
        magicbox.root + "app/koksmat/powershell/deploy-pnp-intra365.ps1",
        "-tenantdomain",
        props.tenant,
        "-siteurl",
        "https://"+props.tenant+".sharepoint.com/sites/koksmat",
        "-kitchen",
        "danish",
      ]}
      onData={props.onData}
      onError={props.onError}
    />
    </div>
  )
}
