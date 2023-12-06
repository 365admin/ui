"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Row, Table } from "@tanstack/react-table"

import { Button } from "@/registry/new-york/ui/button"
import { Input } from "@/registry/new-york/ui/input"
import { DataTableViewOptions } from "@/app/shadcn/examples/tasks/components/data-table-view-options"

import { priorities, statuses } from "../data/data"
import { DataTableFacetedFilter } from "@/app/powershell/components/data-table-faceted-filter"
import { GenericTableActions, ISelectedItemsActionsComponent ,IFilterAction} from "./GenericTableActions"
interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  SelectedItemsActionsComponent?: ISelectedItemsActionsComponent<Row<TData>>
 FilterActions? :  IFilterAction<Row<TData>>
 GeneralActionsComponent?: () => JSX.Element;
}

export function DataTableToolbar<TData>({
  table,
  SelectedItemsActionsComponent,
  GeneralActionsComponent,
  FilterActions
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const {rowSelection} = table.getState()
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter title ..."
          value={(table.getColumn("Title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
         {GeneralActionsComponent && <GeneralActionsComponent  />}
        {FilterActions && <FilterActions rows={table.getSelectedRowModel().flatRows } />}
        {SelectedItemsActionsComponent 
        && Object.keys(rowSelection).length > 0 
        && <SelectedItemsActionsComponent rows={table.getSelectedRowModel().flatRows } />
        }
       
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
