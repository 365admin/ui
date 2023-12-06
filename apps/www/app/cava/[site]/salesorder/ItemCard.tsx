"use client"

import { useEffect, useState } from "react"
import * as React from "react"
import Image from "next/image"
import { MinusIcon, PlusIcon } from "lucide-react"

import { formattedMoney } from "@/lib/formats"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"

import { Item } from "../data/schemas"

export type ItemCardProps = {
  item: Item
  view: "summary" | "details"
  defaultQuantity: number
  existingQuantity: number
  addToOrder: (item: Item, quantity: number) => void
}

export function ItemCard(props: ItemCardProps) {
  const { item, defaultQuantity, addToOrder, view, existingQuantity } = props
  const [quantity, setquantity] = useState(defaultQuantity)
  const [addDialogIsOpen, setaddDialogIsOpen] = useState(false)
  useEffect(() => {
    setquantity(defaultQuantity)
  }, [item])
  if (view === "summary") {
    return (
      <div className="flex w-max">
        <div>
          {quantity} {item.name}
        </div>
        <div className="grow"></div>
        <div>{formattedMoney(item.price * quantity, item.currency.name)}</div>
      </div>
    )
  }
  return (
    <Dialog open={addDialogIsOpen} onOpenChange={setaddDialogIsOpen}>
      <DialogTrigger asChild>
        <Card className="minw-[350px] flex w-[500px] cursor-pointer hover:scale-105 hover:transition-transform">
          <div className="flex grow">
            <div className="grow">
              <CardHeader>
                <CardTitle>
                  <div className="flex h-[150px] flex-col">
                    <div className=" mb-2 text-xl font-bold">{item.name}</div>
                    <div className="grow text-stone-400">
                      {item.description}
                    </div>

                    <div className=" mb-2 text-xl font-bold  text-[#2D32A9]">
                      {formattedMoney(item.price, item.currency.name)}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
            </div>
          </div>
          <div className="pt-3">
            <CardContent className="">
              <div className="  text-clip rounded-md">
                <div className="relative h-[150px] w-[200px] overflow-y-clip ">
                  <img src={item.imageUrl} className="rounded-md" />
                  <div className="absolute  right-0 top-0  rounded-bl-2xl rounded-tr-md bg-cyan-200 p-2">
                    {existingQuantity > 0 && (
                      <div className="px-2 text-2xl font-bold">
                        {existingQuantity}
                      </div>
                    )}
                    {existingQuantity < 1 && <PlusIcon />}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>
            Select the quantity you want to order, then click add to order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 ">
          <div className="">
            <Image
              src={item.imageUrl}
              width={500}
              height={500}
              alt="Tapas"
              className="rounded-md"
            />

            <div className="text-[#2D32A9]">
              {formattedMoney(item.price, item.currency.name)}
            </div>

            <div>{item.description}</div>
          </div>
          <div className="flex">
            <MinusIcon
              className="cursor-pointer"
              onClick={() => {
                if (quantity > 0) setquantity(quantity - 1)
              }}
            />
            <div>{quantity} </div>
            <PlusIcon
              className="cursor-pointer"
              onClick={() => setquantity(quantity + 1)}
            />
            <div className="grow"> </div>
            <Button
              type="button"
              onClick={() => {
                addToOrder(item, quantity)
                setaddDialogIsOpen(false)
              }}
            >
              Add to order{" "}
              {formattedMoney(item.price * quantity, item.currency.name)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
