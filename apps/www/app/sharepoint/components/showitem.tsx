"use client"
import { useContext, useEffect, useState } from "react"

import Link from "next/link"
import { MODULENAME, getAllItemsURL, getOneItemURL } from "@/app/sharepoint"
import { MagicboxContext } from "@/app/magicbox-context"
import { https, httpsGetAll } from "@/lib/httphelper"
import { GenericTable } from "@/components/table"
import { GenericItem } from "@/components/table/data/schema"

export function ShowItem(props: { tenant: string, site: string, listname: string,itemid:string }) {
    const { tenant, site, listname ,itemid} = props

    const magicbox = useContext(MagicboxContext)
    const [items, setitems] = useState<any[]>([])
    const [error, seterror] = useState("")
    useEffect(() => {
        const load = async () => {
            const item = await https<any>(magicbox.session?.accessToken??"", "GET",getOneItemURL(tenant, site, listname,itemid))
            if (item.hasError) {
                seterror(item.errorMessage ?? "Unknown error")
                return
            }
            const fields : any = item.data?.fields
        
            fields.id = item.data?.id
          
            setitems(  Object.getOwnPropertyNames(fields).map((field)=> {
                
                const genericItem : GenericItem<any>= {
                
                    id: field,
                    title: field,
                    details: fields[field].toString(),
                    
                }
                return genericItem

            }))
        }
        if (magicbox.session?.accessToken) {
            load()
        }

    }, [tenant, site, listname,magicbox.session?.accessToken])
    if (error) {
        return <div className="text-red-600">{error}</div>
    }

    return (
        <div>
 <div className="text-xl"><Link href={`/${MODULENAME}/view/${tenant}/${site}`}> {site}</Link></div>
 <div className="text-xl"><Link href={`/${MODULENAME}/view/${tenant}/${site}/${listname}`}> {decodeURIComponent( listname)}</Link></div>
           
           
            <GenericTable data={items} />
        </div>
    )
}