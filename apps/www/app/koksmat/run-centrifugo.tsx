"use client"

import { useProcess } from "@/lib/useprocess"
import { useContext } from "react"
import { MagicboxContext } from "../magicbox-context"
import { KoksmatContext } from "./context"

export function RunCentrifugo(){
    const {root} = useContext(MagicboxContext)
    const koksmat = useContext(KoksmatContext)
const { isLoading, error, data } = useProcess(
    root+"/app/koksmat/powershell/start-centrifugo.ps1",
    [],
    60*60*24, // run for a long time
    "echo"
  )
    return <div>
        {error && <div className="text-red-600" >Centrifugo: {error}</div>}
        {isLoading && <div className="text-slate-400" >Starting Centrigo</div>}
    </div>
}