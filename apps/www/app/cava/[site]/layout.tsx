import "@/styles/globals.css"



import { SiteFooter } from "@/components/magicbox-site-footer"
import { SiteFooter as LocalSiteFooter } from "./components/site-footer"
import { SiteHeader } from "@/app/cava/[site]/components/site-header"

import { MagicBar } from "@/app/magicbox/components/tools"
import { CavaContext } from "./cavacontext"
import { useContext } from "react"
import { CavaToolBar } from "./components/toolbar"
interface RootLayoutProps {
  children: React.ReactNode,
  params: { site: string }
}

export default function RootLayout({ children, params }: RootLayoutProps) {

  return (

    <div>
      <SiteHeader site={params.site} />

      <div className="flex">
    <CavaToolBar />
        <div className="grow" >

          <div className="flex-1">{children}</div>
          <LocalSiteFooter />
        
        </div>
      </div>
    </div>
  )
}
