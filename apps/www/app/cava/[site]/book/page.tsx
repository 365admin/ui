"use client"

import { useContext, useEffect, useState } from "react"
import * as React from "react"
import { addDays, compareAsc, format, parseISO } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { IconLeft, IconRight } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { GenericTable } from "@/components/table"
import { Button } from "@/registry/new-york/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import { useToast } from "@/registry/new-york/ui/use-toast"
import { MagicboxContext } from "@/app/magicbox-context"

import { CavaContext } from "../cavacontext"
import { Appointment, getAppointments } from "../data/officegraph"
import { getRooms } from "../data/sharepoint"

export default function OrganizerRole() {
  const magicbox = useContext(MagicboxContext)
  const cava = useContext(CavaContext)
  //const [appointments, setappointments] = useState<Appointment[]>()
  const [tableView, settableView] = useState<any[]>([])
  const { toast } = useToast()
  const [date, setDate] = React.useState<Date>()

  useEffect(() => {
    setDate(new Date())
  }, [])

  useEffect(() => {
    const load = async () => {
      settableView([])
      const rooms = await getRooms(magicbox.session?.accessToken ?? "")
      if (rooms) {
        // setappointments(data)
        const table: any[] = rooms

          .sort((a, b) => a.name.localeCompare(b.name))
          .map((a) => {
            return {
              id: a.id,
              title: a.name,
              link: "",
              details: "",
            }
          })
        settableView(table)
      }
    }
    if (magicbox.session?.accessToken ) load()
  }, [magicbox.session?.accessToken])

  return (

    <GenericTable
      caption="Rooms"
      data={tableView}
      actions={{
        filterComponent: (params) => {
          if (params) {
            let x = 1
          }
          return (
            <div>
              <Button
                variant="outline"
                onClick={() => {
                  setDate(addDays(date ?? new Date(), -1))
                }}
              >
                <IconLeft />
              </Button>
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
              <Button
                variant="outline"
                onClick={() => {
                  setDate(addDays(date ?? new Date(), 1))
                }}
              >
                {" "}
                <IconRight />
              </Button>
            </div>
          )
        },
        selectedItemsActionsComponent: (params) => {
          return (
            <div>
              <Button variant="destructive"> Delete</Button>
              {params.rows.length === 1 && (
                <Button
                  onClick={() => {
                    const item = params.rows[0].original
                  }}
                >
                  Action on
                </Button>
              )}
              {params.rows.length > 1 && (
                <Button
                  onClick={() => {
                    const items = params.rows.map((r) => {
                      return r.original
                    })
                    debugger
                  }}
                >
                  Actions
                </Button>
              )}
            </div>
          )
        },
      }}
    />
  )
}
