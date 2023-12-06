"use client"

import { KoksmatContext } from "@/app/koksmat/context"
import { MagicBar } from "@/app/magicbox/components/tools"
import * as React from "react"
import { useContext } from "react"

export function KoksmatToolBar(){
    const {showToolbar} =  useContext(KoksmatContext) 
    if (!showToolbar) return null
      // return null
    return (
        <div className="mr-4 hidden md:flex">
        <div className=" w-[64px] border-r border-gray-400">
          <div className="sticky top-[64px]">
            <MagicBar toolbarId={1}/>
          </div>
        </div>
      </div>
    )
}

