"use client"
import { useMemo } from "react"
import { readProcessdata } from "./server"

export default function Index() {
    const process = useMemo(async () => {return await readProcessdata("/Users/nielsgregersjohansen/code/koksmat/ui/apps/www/app/code/process.json")},[])
    return (

        <div>
<pre>
    {JSON.stringify(process,null,2)}
</pre>


        </div>
    )
}