

import * as React from "react"
import Link from "next/link"


import { siteConfig } from "../config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ForModule, ForRole } from "@/components/roles"
import { NavigationRootLink } from "./NavigationRootLink"

export function MainNav() {
  

  return (
    <div className="mr-4 hidden md:flex">
      <Link href={siteConfig.root} className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
        {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <ForModule module="UserProfiles">
          <NavigationRootLink name="Profiles" href="/profile" />
        </ForModule>
        
        <ForRole module="UserProfiles" role="Admin">
        <NavigationRootLink name="Lists" href="https://christianiabpos.sharepoint.com/sites/nexiintra-home/_layouts/15/viewlsts.aspx?view=14" />
        </ForRole>

      </nav>
    </div>
  )
}

