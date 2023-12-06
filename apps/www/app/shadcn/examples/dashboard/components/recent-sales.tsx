"use client";
import { CavaContext } from "@/app/cava/[site]/cavacontext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar"
import { useContext } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericTable } from "@/components/table";


export function RecentSales() {
  const cava = useContext(CavaContext)

  return (
    <div className="space-y-8">
      {cava.orders.sort((a, b) => { return parseInt(b.id) - parseInt(a.id) }).filter((order, index) => { return index < 5 }).map((order, key) => {
        const orderSum = order.items.reduce((a, b) => a + (b.price * b.quantity), 0)
        return <div  key={key}>
          <Dialog >
            <DialogTrigger asChild>
              <div className="flex cursor-pointer items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none"> #{order.id}  {order.deliveryDateTime.toLocaleDateString()}</p>
                  <p className="text-sm text-muted-foreground">
                 {order.organizer}
                  </p>
                </div>
                <div className="ml-auto font-medium">{orderSum}</div></div>
            </DialogTrigger>
            <DialogContent className="  bg-white">
              <DialogHeader>
                <DialogTitle>Order Details (#{order.id})</DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you are done. */}
                </DialogDescription>
              </DialogHeader>
              <div className="minw-[1200px] grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Organizer
                  </Label>
                  <Input id="name" value={order.organizer} className="col-span-2" />
                </div>
                <div className="minw-[800px] grid items-center gap-4">
                  <GenericTable data={order.items.map(o=>{return {title:o.item.name,id:o.id,link:"",details:`${o.quantity} pcs.`}})} />
                </div>
              </div>
              {/* <DialogFooter>
                <Button type="submit">Close</Button>
              </DialogFooter> */}
            </DialogContent>
          </Dialog>



        </div>



      })}

    </div>
  )
}


