"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Item, Order } from "../data/schemas";
import { formattedMoney } from "@/lib/formats";
import { Sheet,SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/registry/default/ui/sheet";
import { ItemCard } from "./ItemCard";
import { useState } from "react";
import { Checkout } from "./Checkout";
import { Check } from "lucide-react";

type BasketProps = {
  order: Order;
  addToOrder: (item: Item, quantity: number) => void;
  sendOrder: (order: Order) => void
};
export function Basket(props: BasketProps) :JSX.Element {
  const { order, addToOrder,sendOrder } = props;
  const [checkOut, setcheckOut] = useState(false)
  if (!order || order?.items.length < 1) return <div></div>;
  if (order?.items.length > 0) {
    const totalPrice = order.items.reduce(
      (a, b) => a + b.price * b.quantity,
      0
    );
    const currencyName = order.items[0].item.currency.name;
    return (
      <div>
      <Sheet >
        <SheetTrigger asChild>
          <Button>
            {order.items.length} Show order {formattedMoney(totalPrice, currencyName)}
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-white sm:max-w-[425px]">
          <SheetHeader>
            <SheetTitle>Your order</SheetTitle>
          
          </SheetHeader>

          {order.items.map((item, key) => {
            return (
              <div key={key} className="flex items-center">
                <ItemCard
                  view="summary"
                  item={item.item}
                  defaultQuantity={item.quantity}
                  addToOrder={addToOrder}
                  existingQuantity={item.quantity} />
              </div>
            );
          })}
          <div className="mt-5 ">
         
          <Checkout asChild order={order} addToOrder={addToOrder} sendOrder={sendOrder} />
           
          </div>
        </SheetContent>
      </Sheet>

      </div>
    );
  }else return <div></div>
}
