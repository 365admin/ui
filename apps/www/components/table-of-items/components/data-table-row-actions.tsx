"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { EXCHANGEPOWERSHELLROOT, POWERSHELLROOT } from "@/app/powershell/exchange"
import { Button } from "@/registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"

import { labels } from "../data/data"
import { schema } from "../data/schema"
import Link from "next/link"

interface DataTableRowActionsProps<TData> {
  link:string,
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  link,
  row,
}: DataTableRowActionsProps<TData>) {
  //const logentry = schema.parse(row.original)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>View</DropdownMenuItem>
         
        <DropdownMenuSeparator />

     
        <DropdownMenuItem >
          <Link target="_blank" href={`${link}`}>
          View Details
          </Link>
          <DropdownMenuShortcut>⌘v</DropdownMenuShortcut>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
