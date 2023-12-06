"use client"

import { MagicBar } from "@/app/magicbox/components/tools"
import * as React from "react"
import { useContext } from "react"
import { CavaContext } from "../cavacontext"
export function CavaToolBar(){
    const {hasRole} =  useContext(CavaContext) 
    if (!hasRole("feature.toolbar")) return null
       
    return (
        <div className="mr-4 hidden md:flex">
        <div className=" w-[64px] border-r border-gray-400">
          <div className="sticky top-[64px]">
            <MagicBar />
          </div>
        </div>
      </div>
    )
}

