"use client"
import "@/styles/globals.css"





import { KoksmatToolBar } from "./components/toolbar"
import { useContext, useEffect } from "react"
import { KoksmatContext } from "@/app/koksmat/context"
interface RootLayoutProps {
  children: React.ReactNode,
  site: string, tenant: string 
}

export default function ClientLayout({ children, site,tenant }: RootLayoutProps) {
 
  const koksmat = useContext(KoksmatContext)

  useEffect(() => {
    koksmat.setSiteContext(tenant,site)

  }, [tenant,site,koksmat])
  return (

    <div>
      

      <div className="flex">
        <KoksmatToolBar />
        <div className="grow" >

          <div className="flex-1">{children}</div>
         
      

        </div>
      </div>
    </div>
  )
}
