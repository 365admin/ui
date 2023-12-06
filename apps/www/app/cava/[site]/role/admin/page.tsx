//"use client"

import { Button } from "@/registry/new-york/ui/button"
import Link from "next/link"
import * as React from "react"
import {redirect} from "next/navigation"

export default function AdminRole({ params }: { params: { site: string } }) {
  //TODO: Keep on this page when there is more links than one to select from
  redirect(`/cava/${params.site}/role/admin/rooms`) 

  return (
    <div>
     <Link href={`/cava/${params.site}/role/admin/rooms`} as={`/cava/${params.site}/role/admin/rooms`}>
      <Button>Rooms</Button>
    
      
      </Link>
     
     </div>
  )
}
