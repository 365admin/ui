"use client"

import { useContext, useEffect, useState } from "react"
import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { addDays, compareAsc, format, parseISO, set } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { IconLeft, IconRight } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { GenericTable } from "@/components/table"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { GenericItem } from "@/components/table/data/schema"
import { Button } from "@/registry/new-york/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import { useToast } from "@/registry/new-york/ui/use-toast"
import { MagicboxContext } from "@/app/magicbox-context"

import { CavaContext } from "../../cavacontext"
import { Appointment, getAppointments } from "../../data/officegraph"
import { Order } from "../../data/schemas"
import { createWorkOrderItems } from "../../data/sharepoint"
import { AcceptOrder } from "./AcceptOrder"

export default function DispatcherRole() {
  const magicbox = useContext(MagicboxContext)
  const cava = useContext(CavaContext)
  //const [appointments, setappointments] = useState<Appointment[]>()
  const [tableView, settableView] = useState<any[]>([])
  const { toast } = useToast()
  const [date, setDate] = React.useState<Date>()
const [panelopen, setpanelopen] = useState(false)
  useEffect(() => {
    setDate(new Date())
  }, [])

  useEffect(() => {
    const load = async () => {
      settableView([])

      if (cava.orders) {
        // setappointments(data)
        const table: any[] = cava.orders
          .filter((a) => {
            return a.deliveryDateTime >= (date ?? new Date())
          })
          .sort((a, b) => compareAsc(a.deliveryDateTime, b.deliveryDateTime))
          .map((a) => {
            return {
              id: a.id,
              title: format(a.deliveryDateTime, "PPP") + " ",
              link: "/cava/salesorder/" + a.id,
              string1: a.stage,
              string2: a.organizer,
              details: a.items
                .map((i) => {
                  return i.quantity + " " + i.item.name
                })
                .join(", "),
            }
          })
        settableView(table)
      }
    }
    if (magicbox.session?.accessToken && date) load()
  }, [magicbox.session?.accessToken, date, cava.orders])
  const col: ColumnDef<GenericItem<any>> = {
    id: "string1",
    accessorKey: "string1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage" />
    ),
    cell: ({ row }) => <div>{row.original.string1}</div>,
    enableSorting: true,
    enableHiding: true,
  }
  const col2: ColumnDef<GenericItem<any>> = {
    id: "string2",
    accessorKey: "string2",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organizer" />
    ),
    cell: ({ row }) => <div>{row.original.string2}</div>,
    enableSorting: true,
    enableHiding: true,
  }
  return (
    <div>
      <GenericTable
        caption="Catering Orders"
        description="Orders that are ready to be dispatched"
        data={tableView}
        addtionalColumns={[col, col2]}
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
                <Popover open={panelopen} onOpenChange={setpanelopen}>
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
                {/* <Button variant="destructive"> Delete</Button> */}
                {params.rows.length === 1 &&
                  params.rows[0].original.string1 === "New" && (
                    <AcceptOrder
                      order={
                        cava.orders.find(
                          (o) => o.id === params.rows[0].original.id
                        ) ?? null
                      }
                      onAcceptOrder={function (order: Order): void {
                     
                         createWorkOrderItems(
                           magicbox.session?.accessToken ?? "",
                           order
                         )
                         params.rows[0].original.string1 = "Pending"
                         toast({
                            title: "Work Orders created",
                            
                           variant: "default"
                         })

                      }}
                    />
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
    </div>
  )
}
