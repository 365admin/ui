"use client"

import { useEffect, useState } from "react"

import { run } from "@/app/koksmat/tenants/[tenant]/site/[site]/server"
import { Result } from "./httphelper"

export const version = 1

export function   useProcess(
  cmd: string,
  args: string[],
  timeout: number,
  channel: string,
  cwd?:string,
  ran?: boolean,
  setran?: (ran: boolean) => void,
  setresult?: (result: Result<string>) => void,
 
) {
  const [data, setdata] = useState<any>()
  const [isLoading, setisLoading] = useState(false)
  const [error, seterror] = useState("")
 
  useEffect(() => {
    const load = async () => {
      
      if (ran) return
    
      seterror("")
      if (setran) {
        setran(true)
      }
      const result = await run(cmd, args, timeout, channel,cwd)
      
      setisLoading(false)
      if (setresult) {setresult(result)}
      if (result.hasError) {
        seterror(result.errorMessage ?? "Unknown error")
       
        return
      }else
      {
        setdata(result.data)
      }
    }
    if (channel && cmd && timeout && args) {
     
        load()
      
    }
  }, [channel, cmd, timeout, args, cwd, ran, setran, setresult])

  return {
    data,
    error,
    isLoading,
  }
}
