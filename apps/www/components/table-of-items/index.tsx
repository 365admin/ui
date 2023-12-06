import { ColumnDef } from "@tanstack/react-table"

import ToSmall from "@/components/tosmall"
import { action } from "@/app/powershell/exchange/rooms/actions/deleteroom"

import { GenericTableActions } from "./components/GenericTableActions"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { DataTableColumnHeader } from "./components/data-table-column-header"
import { GenericItem } from "./data/schema"

export interface TableOfItemsProps<T>{
  caption?: string
  description?: string
  data: any
  schema: Zod.Schema
  columns: ColumnDef<T>[]
 // actions?: GenericTableActions<GenericItem<any>>
}

export function TableOfItems<T>(params: TableOfItemsProps<T>) {
  // const instanceColumns = [...columns]
  // if (params.addtionalColumns) {
    
  //   params.addtionalColumns.forEach((c) =>
  //   instanceColumns.splice(columns.length - 1, 0, c)
  //   )
  // }
  return (
    <>
   
      <div className=" h-full flex-1 flex-col   md:flex">
        {params.caption && (
          <div className="mb-4 flex items-center  ">
          <div className="text-2xl font-bold">{params.caption}</div>
          <div className="text-md ml-3">{params.description}</div>
          </div>
        )}
          
        <DataTable
          data={params.data}
          schema={params.schema}
          columns={params.columns ?? []}
        // actions={params.actions}
        />
      </div>
    </>
  )
}
