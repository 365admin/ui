"use client"


import * as React from "react"

import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
export function SiteMenu(props: {site: string}){

    return (
        <div >
      <MainNav  site={props.site}/>
        <MobileNav />
      </div>
    )
}

