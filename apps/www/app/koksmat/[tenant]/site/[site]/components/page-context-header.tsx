"use client"
import { useContext } from "react"
import { KoksmatContext } from "../../../../context"
import { Button } from "@/registry/new-york/ui/button"
import Link from "next/link"

export function PageContextHeader(props: { title: string }) {
  const { title } = props
  const {tenant,site,kitchen,station, options,domain,currentstation} = useContext(KoksmatContext)
  return <div>
    <div className="m-3 ml-0 rounded-xl bg-slate-800 text-gray-50">
      <div className="ml-3 p-4 text-3xl">{title} </div>
      
    </div>
    {options.showContext &&
    <div>
      <div className="ml-2 mr-6  mt-[-10px] flex space-x-2  text-xs" > 
      <div className="flex"><div className="text-slate-600">tenant:</div>
        <Link href="/koksmat">{tenant}</Link>  
        </div>
    {site &&  
    <div className="flex"><div>site:</div>  <Link href={`/koksmat/${tenant}/site`}>{site}</Link>  </div>}
{site &&  
      <div className="flex"><div>kitchen:</div>  <Link href={`/koksmat/${tenant}/site/${site}/kitchen`}>{kitchen? kitchen:"<select>"}</Link> </div>
}
{kitchen &&
      <div className="flex"><div>station:</div>  <Link href={`/koksmat/${tenant}/site/${site}/kitchen/${station}`}>{station? station:"<select>"}</Link> </div>
    }

<div className="flex"><div>azure:</div>  <Link href={`/koksmat/azure`}>{domain? domain:"<select>"}</Link> </div>
      <div className="grow" />
      <div> {currentstation?.cwd}</div></div>
    </div>}
  </div>
}

