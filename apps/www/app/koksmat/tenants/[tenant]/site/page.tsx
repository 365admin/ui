"use client"

import { useContext, useEffect, useMemo, useState } from "react"

import Link from "next/link"
import { Button } from "@/registry/new-york/ui/button"
import { MagicboxContext } from "@/app/magicbox-context"
import { PageContextHeader } from "./[site]/components/page-context-header"
import { KoksmatContext } from "../../../context"


export default function Koksmat() {

const magicbox = useContext(MagicboxContext)
const {tenant,defaultsite} = useContext(KoksmatContext)
const [error, seterror] = useState("")


return (
<div className="container h-screen">
    {error && <div className="text-red-600">{error}</div>}
    <PageContextHeader title="Select site" />
  
    <div>
   <Button><Link href={`/koksmat/tenants/${tenant}/site/${defaultsite}`}>Default site</Link></Button>
    </div>
</div>

)

}