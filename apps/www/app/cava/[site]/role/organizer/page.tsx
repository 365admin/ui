"use client"

import { useContext, useEffect, useState } from "react"
import * as React from "react"

import { GenericTable } from "@/components/table"
import { useToast } from "@/registry/new-york/ui/use-toast"
import { MagicboxContext } from "@/app/magicbox-context"

import { Appointment, getAppointments } from "../../data/officegraph"
import { Button } from "@/registry/new-york/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/new-york/ui/popover"
import { cn } from "@/lib/utils"
import {  CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format,parseISO,addDays } from "date-fns"

export default function OrganizerRole() {
  const magicbox = useContext(MagicboxContext)
  //const [appointments, setappointments] = useState<Appointment[]>()
  const [tableView, settableView] = useState<any[]>([])
  const { toast } = useToast()
  const [date, setDate] = React.useState<Date>()

  useEffect(() => {
    setDate(new Date())
  }, [])

  useEffect(() => {
    const load = async () => {
      const token: string = magicbox.session?.accessToken ?? ""
      settableView([])
     if (!date) return
      
      const { data, hasError, errorMessage } = await getAppointments(token,date,7,100)
      if (hasError) {
        toast({
          title: `Error getting appointments`,
          description: errorMessage,
        })
        return
      }
      if (data) {
       // setappointments(data)
        const table: any[] = data
            .filter((a) => {
                return a.isOrganizer
            })
          .sort((a, b) => {
            if (a.start.dateTime > b.start.dateTime) return 1
            if (a.start.dateTime < b.start.dateTime) return -1
            return 0
          })
          .map((a) => {
            const d = parseISO(a.start.dateTime)
            return {
              id: a.id,
              title: d.toLocaleString() + " " + a.subject,
              link: a.webLink,
              details: a.isOrganizer  ? "Organizer" : ""//  a.bodyPreview,
            }
          })
        settableView(table)
      }
    }
    if (magicbox.session?.accessToken && date) load()
  }, [magicbox.session?.accessToken,date])

  return (
   
        <GenericTable caption="Meetings I'm organizing" data={tableView}         actions={{
            filterComponent: (params) => {
                if (params) {let x=1}
                return (
                    
                    <div>
                            <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>{" "}
              <Button variant="outline" onClick={()=>{
                  setDate(addDays(date ?? new Date(),7))

              }}> Next Week</Button>
                    </div>
                   
                    )
            },
            selectedItemsActionsComponent: (params) => {
              return (
                <div>
                    <Button variant="destructive"> Delete</Button>
                    {params.rows.length===1 && 
                  <Button onClick={() => {
                    const item = params.rows[0].original
                  }}>
                    Action on
                  </Button>}
                  {params.rows.length>1 && 
                  <Button onClick={() => {
                    const items = params.rows.map((r) => {
                        return r.original
                    })
                    debugger
                  }}>
                    Actions
                  </Button>}
                </div>
              )
            },
          }} />
  
  )
}
