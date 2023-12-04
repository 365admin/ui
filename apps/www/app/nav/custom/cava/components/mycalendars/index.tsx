"use client"

import {  useEffect, useState } from "react"
import { httpsGetAll } from "@/lib/httphelper"
import {Value } from "./schema"
import { Badge } from "@/registry/new-york/ui/badge"



export default function MyCalendars(props: {token:string,onSelect:(calendar:Value)=>void}) {

const {token,onSelect} = props
  const [error, seterror] = useState("")
  const [calendars, setcalendars] = useState<Value[]>([])

  useEffect(() => {
    if (!token) return
    const load = async () => {
      const response = await httpsGetAll<Value>(
        token,
        "https://graph.microsoft.com/v1.0/me/calendars"
      )
      if (response.hasError) {
        seterror(response.errorMessage?.toString() ?? "unknown error")
        return
      }
      setcalendars(response.data ?? [])
    }
    load()
  }, [token])



  return (
    <div className="space">
        {error && <div className="text-red-600">{error}</div>}
       
       {calendars.sort((a,b)=>a.name.localeCompare(b.name)).map((calendar) => {
            return <div onClick={()=>{onSelect(calendar)}}  key={calendar.id} className="p-3">{calendar.name} ({calendar.owner.name})
            {!calendar.canEdit && <Badge variant={"destructive"}>Read Only</Badge> }
            {calendar.isDefaultCalendar && <Badge>Default</Badge> }
            </div>
       })}
       
    
    </div>
  )
}
