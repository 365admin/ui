"use client"

import { debug } from "console"
import { useContext, useEffect, useState } from "react"
import * as React from "react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, ResetIcon } from "@radix-ui/react-icons"
import { format, min } from "date-fns"
import { SearchIcon } from "lucide-react"
import { Form, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SearchUserForm } from "@/components/searchuser"
import { toast, useToast } from "@/registry/default/ui/use-toast"
import { DialogFooter } from "@/registry/new-york/ui/dialog"
import { CavaContext } from "@/app/cava/[site]/cavacontext"
import { getCavaOrders } from "@/app/cava/[site]/data"
import { MagicboxContext } from "@/app/magicbox-context"

import { Item, Order, OrderItem } from "../data/schemas"
import { addOrder } from "../data/sharepoint"
import { Basket } from "./Basket"
import { ItemCard } from "./ItemCard"

export default function Cava() {
  const cava = useContext(CavaContext)
  const magicbox = useContext(MagicboxContext)
  const [order, setorder] = useState<Order>({
    items: [],
    id: "",
    deliverTo: {
      id: "",
      name: "",
      email: "",
    },
    deliveryDateTime: new Date(),
    hour:9,
    minute:30,
    organizer: "",
  })
  const [quantity, setquantity] = useState(0)
  const [searchfor, setsearchfor] = useState("")
  const { toast } = useToast()
  const router = useRouter()
  const [date, setDate] = React.useState<Date>()
const [hour, sethour] = useState(0)
const [minute, setminute] = useState(0)
  useEffect(() => {
    if (!order.organizer && magicbox.session?.user) {
      setorder({ ...order, organizer: magicbox.session.user.email })
    }
    if (!date) {
      setDate(new Date())
      sethour(9)
      setminute(30)
    }
  

  }, [magicbox.session])

  const sendOrder = async (order: Order) => {
    const newItem = await addOrder(magicbox.session?.accessToken ?? "", order)
    if (newItem.hasError) {
      toast({
        title: `Error sending order`,
        description: newItem.errorMessage,
      })
      return
    }
    toast({
      title: `Order sent - #${newItem.data?.id}`,
    })

    await new Promise((r) => setTimeout(r, 1500))
    router.replace(`/cava/salesorder/${newItem.data?.id}`)
  }

  const addToOrder = (item: Item, quantity: number) => {
    const newOrder: Order = {
      items: [],
      id: "",
      deliverTo: {
        id: "",
        name: "",
        email: "",
      },
      deliveryDateTime: new Date(),
      organizer: "",
      hour: 0,
      minute: 0
    }
    const o = order ?? newOrder

    const i = o.items.findIndex((i) => {
      return i.id === item.id
    })
    if (i >= 0) {
      o.items[i].quantity = quantity
    } else {
      const newItem: OrderItem = {
        id: item.id,
        quantity: quantity,
        price: item.price,
        item,
        deliveryHour: 0,
        deliveryMinute: 0,
      }
      o.items.push(newItem)
    }
    setorder(o)
    toast({
      title: `${item.name} added to order`,
    })
  }
  const findExistingQuantity = (item: Item, valueIfNotFound: number) => {
    const i = order?.items.find((i) => {
      return i.id === item.id
    })
    return i?.quantity ?? valueIfNotFound
  }

  return (
    <div className="minh-screen container">
      <div className="sticky top-[5px] z-10 bg-white">
        <div className="flex justify-between">
          <div>
            <div className="text-sm">Delivery to</div>
            <div>
              {" "}
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select place" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Locations</SelectLabel>
                    <SelectItem value="reception">Reception</SelectItem>
                    <SelectItem value="meetingroom">Meeting Room</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm">Date</div>
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
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm">Time</div>
            <div className="flex">
              {" "}
              <Select defaultValue={hour.toString()}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Hour</SelectLabel>
                    {Array.apply(null, Array(24)).map((hour, hourKey) => {
                      return (
                        <SelectItem key={hourKey} value={hourKey.toString()}>
                          {hourKey.toString().padStart(2, "0")}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="Minute" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Minute</SelectLabel>
                    {Array.apply(null, Array(12)).map((minute, minKey) => {
                      const value = (minKey * 5).toString()
                      return (
                        <SelectItem key={value} value={value}>
                          {(minKey * 5).toString().padStart(2, "0")}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="ml-4">
            <div className="text-sm">Ordred by</div>
            <div>
              {" "}
              <SearchUserForm
                onSelectUser={(selecteduser) => {
                  debugger
                  if (order) {
                    order.organizer = selecteduser?.userPrincipalName ?? ""
                  }
                  setorder(order)
                }}
                defaultuserUserPrincipalName={order.organizer}
              />
            </div>
          </div>
          <div className="grow" />
          <div>
            {order && (
              <Basket
                order={order}
                addToOrder={addToOrder}
                sendOrder={sendOrder}
              />
            )}
          </div>
        </div>
        {/* <pre>
        {JSON.stringify(order, null, 2)}
      </pre> */}
        <div className=" mt-4 flex ">
          {cava?.itemGroups
            .sort((a, b) => {
              return a.sortOrder - b.sortOrder
            })
            .map((itemgroup, key) => {
              return (
                <div
                  key={key}
                  className="mr-3 mt-3 cursor-pointer hover:text-[#2D32A9]"
                  onClick={() => {
                    const t = document.getElementById(encodeURI(itemgroup.name))
                    //debugger;
                    window.scrollTo({
                      left: 0,
                      top:
                        (document.getElementById(encodeURI(itemgroup.name))
                          ?.offsetTop ?? 200) - 200,
                    })
                  }}
                >
                  {itemgroup.name}
                </div>
              )
            })}
          <div className="grow"></div>
          <div className="flex rounded-full bg-gray-300 p-3 focus:border-blue-500 ">
            <SearchIcon className="mr-2" />
            <input
              type="text"
              defaultValue={searchfor}
              placeholder="Search in the pricelist"
              className="border-transparent bg-gray-300 focus:border-transparent focus:ring-0"
              onChange={(e) => {
                setsearchfor(e.currentTarget.value)
              }}
            ></input>

            {/* <div className="minw-[20px]">
          {searchfor !== "" && 
          <ResetIcon className="ml-2 cursor-pointer" onClick={()=>setsearchfor("")} />}</div> */}
          </div>
          <hr />
        </div>
      </div>
      <div>
        {cava?.itemGroups
          .sort((a, b) => {
            return a.sortOrder - b.sortOrder
          })
          .map((itemgroup, key) => {
            return (
              <div key={key}>
                <h2
                  id={encodeURI(itemgroup.name)}
                  className={
                    "my-3 text-2xl font-bold leading-none tracking-tight"
                  }
                >
                  {itemgroup.name}
                </h2>
                <div className="flex flex-wrap items-center ">
                  {cava?.items
                    ?.filter((item) => {
                      return item.itemGroups?.find((itemgroup2) => {
                        return (
                          itemgroup2.id === itemgroup.id &&
                          (searchfor === "" ||
                            item.name
                              .toLowerCase()
                              .includes(searchfor.toLowerCase()))
                        )
                      })
                    })
                    .sort((a, b) => {
                      return a.name.localeCompare(b.name)
                    })
                    .map((item, key) => {
                      return (
                        <div className="m-2" key={key}>
                          <ItemCard
                            view="details"
                            item={item}
                            defaultQuantity={findExistingQuantity(item, 1)}
                            existingQuantity={findExistingQuantity(item, 0)}
                            addToOrder={addToOrder}
                          />
                        </div>
                      )
                    })}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
