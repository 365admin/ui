"use client"

import * as React from "react"

import { formattedMoney } from "@/lib/formats"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"

import { Item, Order } from "../data/schemas"
import { ItemCard } from "./ItemCard"

type CheckoutProps = {
  order: Order
  addToOrder: (item: Item, quantity: number) => void
  sendOrder: (order: Order) => void
  asChild:boolean
}
export function Checkout(props: CheckoutProps) : JSX.Element {
  const { order, addToOrder,sendOrder } = props
  if (!order || order?.items.length < 1) return <div></div>
  if (order?.items.length > 0) {
    const totalPrice = order.items.reduce((a, b) => a + b.price * b.quantity, 0)
    const currencyName = order.items[0].item.currency.name
    return (
      <Dialog>
        <DialogTrigger asChild>
           <Button type="submit" ><div className="flex w-[240px] p-3">Checkout </div><div className="grow"></div> <div>{formattedMoney( totalPrice,currencyName)}</div> </Button>
        </DialogTrigger>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Your order</DialogTitle>
          </DialogHeader>

          {order.items.map((item, key) => {
            return (
              <div key={key} className="flex items-center">
                <ItemCard
                  view="summary"
                  item={item.item}
                  defaultQuantity={item.quantity}
                  addToOrder={addToOrder}
                  existingQuantity={item.quantity}
                />
              </div>
            )
          })}
          <div className="mt-5 ">
            <Button type="submit" onClick={()=>sendOrder(order)}>
              <div className="flex w-[240px] p-3">Send order </div>
              <div className="grow"></div>{" "}
              <div>{formattedMoney(totalPrice, currencyName)}</div>{" "}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }else return <div></div>
}
