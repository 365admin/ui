"use client"
import { useContext, useEffect, useState } from "react"

import Link from "next/link"
import { MODULENAME, getAllItemsURL, getAllListURL, getAllSites } from "@/app/sharepoint"
import { MagicboxContext } from "@/app/magicbox-context"
import { httpsGetAll } from "@/lib/httphelper"
import { GenericTable } from "@/components/table"
import { GenericItem } from "@/components/table/data/schema"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/registry/new-york/ui/button"


export function ShowSites(props: { tenant: string,search:string }) {
    const { tenant,search } = props

    const magicbox = useContext(MagicboxContext)
    const [items, setitems] = useState<any[]>([])
    const [error, seterror] = useState("")
    useEffect(() => {
        const load = async () => {
            const items = await httpsGetAll(magicbox.session?.accessToken ?? "", getAllSites(search))
            if (items.hasError) { 
                seterror(items.errorMessage ?? "Unknown error")
                return
            }
            setitems(items.data ?? [])
        }
        if (magicbox.session?.accessToken) {
            load()
        }

    }, [tenant, magicbox.session?.accessToken,search])
    if (error) {
        return <div className="text-red-600">{error}</div>
    }
    const col1: ColumnDef<GenericItem<any>> = {
        id: "string1",
        accessorKey: "string1",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Link" />
        ),
        cell: ({ row }) => <Link href={`/${MODULENAME}/view/${tenant}/${row.original.id}`}> <Button variant={"link"}>View</Button></Link>,
        enableSorting: true,
        enableHiding: true,
    }
    return (
        <div>
            <div className="text-xl"><Link href={`/${MODULENAME}/view/${tenant}}`}> {tenant}</Link></div>

         

            <GenericTable
                addtionalColumns={[col1]}

                data={items.map((item) => {

                    const genericItem: GenericItem<any> = {

                        id: item.name,
                        title: item.name,
                        link: `/${MODULENAME}/view/${tenant}/${item.name}}`,
                    }
                    return genericItem

                })} />
        </div>
    )
}