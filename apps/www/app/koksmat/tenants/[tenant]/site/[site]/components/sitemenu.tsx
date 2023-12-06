"use client"


import * as React from "react"

import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
export function SiteMenu(){

    return (
        <div >
      <MainNav  />  
        <MobileNav />
      </div>
    )
}

