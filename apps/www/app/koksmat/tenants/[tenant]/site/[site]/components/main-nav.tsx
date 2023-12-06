import * as React from "react"
import { NavigationMenuKoksmat } from "./desktop-menu"
import { Tool } from "@/app/magicbox/components/tools"
import { useContext } from "react"
import { KoksmatContext } from "@/app/koksmat/context"

export function MainNav() {
  const { showToolbar, site, tenant } = useContext(KoksmatContext)

  return (
    <div className="mr-4 hidden md:flex">

      <div className="h-[64px] w-[64px]">
        <Tool standalone noTopMargin link={`/koksmat/${site}`} displayName={""} script={""} iconUrl={"/koksmat/koksmat Icon.png"} openIn={"Same page"}></Tool>
      </div>

      <nav className="flex items-center space-x-6 text-sm font-medium">
        {showToolbar &&
          <NavigationMenuKoksmat />}

      </nav>
    </div>
  )
}

