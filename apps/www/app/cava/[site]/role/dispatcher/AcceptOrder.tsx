"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Item, Order } from "../../data/schemas";
import { formattedMoney } from "@/lib/formats";
import { Sheet,SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/registry/default/ui/sheet";

import { useState } from "react";

import { Check } from "lucide-react";
import { ItemCard } from "../../salesorder/ItemCard";

type BasketProps = {
  order: Order | null;
 
  onAcceptOrder: (order: Order) => void
};
export function AcceptOrder(props: BasketProps) :JSX.Element {
  const { order,onAcceptOrder } = props;
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
            Accept 
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-white sm:max-w-[425px]">
          <SheetHeader>
            <SheetTitle>Orders</SheetTitle>
          
          </SheetHeader>

          {order.items.map((item, key) => {
            return (
              <div key={key} className="flex items-center">
                <ItemCard
                  view="summary"
                  item={item.item}
                  defaultQuantity={item.quantity}

                  existingQuantity={item.quantity} addToOrder={function (item: { id: string; name: string; providerId: string; provider: { id: string; name: string; email: string; }; currency: { id: string; name: string; rate: number; }; itemGroups: { id: string; name: string; sortOrder: number; }[]; description: string; price: number; comments: string; imageUrl: string; }, quantity: number): void {
                   debugger
                  } } />
              </div>
            );
          })}
          <div className="mt-5 ">
         <Button onClick={()=>onAcceptOrder(order)}><Check className="mr-2 h-4 w-4" />Accept</Button>
          {/* <Checkout asChild order={order} addToOrder={addToOrder} sendOrder={sendOrder} />
            */}
          </div>
        </SheetContent>
      </Sheet>

      </div>
    );
  }else return <div></div>
}
