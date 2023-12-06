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
import { format,parseISO,addDays,compareAsc } from "date-fns"
import { CavaContext } from "../../cavacontext"
import { IconLeft, IconRight } from "react-day-picker"
import { getWorkOrderItems, getWorkOrders } from "../../data/sharepoint"
import { GenericItem } from "@/components/table/data/schema"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"

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
     const workOrders =  await  getWorkOrderItems(magicbox.session?.accessToken ?? "",cava.items,cava.orders)
   

      if (workOrders) {
       // setappointments(data)
        const table: any[] = 
        workOrders
          //.filter((a) => {return >=(date??new Date())})
          //.sort((a, b) =>compareAsc(a.deliveryDateTime, b.deliveryDateTime))
          .map((a) => {
         
            return {
              id: a.id,
              title: a.item.name ,
              link: "",
              details: a.quantity + " pcs",
              string3: a.order.organizer,
              string2: a.item.provider.name,
              string1: format(a.dateToDeliver,"yyyy-MM-dd") + " " + a.deliveryHour.toString().padStart(2,"0")+":"+a.deliveryMinute.toString().padStart(2,"0"),
            }
          })
        settableView(table)
      }
    }
    if (magicbox.session?.accessToken && date) load()
  }, [magicbox.session?.accessToken,date,cava.orders])
  const col1: ColumnDef<GenericItem<any>> = {
    id: "string1",
    accessorKey: "string1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Time" />
    ),
    cell: ({ row }) => <div>{row.original.string1}</div>,
    enableSorting: true,
    enableHiding: true,
  } 
  const col2: ColumnDef<GenericItem<any>> = {
    id: "string2",
    accessorKey: "string2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    cell: ({ row }) => <div>{row.original.string2}</div>,
    enableSorting: true,
    enableHiding: true,
  }
  const col3: ColumnDef<GenericItem<any>> = {
    id: "string3",
    accessorKey: "string3",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organizer" />
    ),
    cell: ({ row }) => <div>{row.original.string3}</div>,
    enableSorting: true,
    enableHiding: true,
  }
  return (
   
        <GenericTable caption="Items ordred" data={tableView}  
        
        addtionalColumns={[col3,col2,col1]}
            
        actions={{
            filterComponent: (params) => {
                if (params) {let x=1}
                return (
                    
                    <div>
                          <Button variant="outline" onClick={()=>{
                  setDate(addDays(date ?? new Date(),-1))

              }}>
              
                <IconLeft/>
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
              <Button variant="outline" onClick={()=>{
                  setDate(addDays(date ?? new Date(),1))

              }}> <IconRight /></Button>
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
