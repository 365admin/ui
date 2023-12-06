
	
"use client"
import * as React from "react"
import { ItemType, FieldNames,schema } from "."

import { TableOfItems } from "@/components/table-of-items"

import { Checkbox } from "@/registry/new-york/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/table/components/data-table-column-header"
import { DataTableRowActions } from "@/components/table/components/data-table-row-actions"
import Link from "next/link"
import { Button } from "@/registry/new-york/ui/button"
import { useState,useMemo } from "react"

export function CateringOrdersTable(props: { items: ItemType[], viewFields?: FieldNames[],site:string,listName:string,hideSelect?:boolean,hideLink?:boolean }) {
	// table columns will be inserted here
	const columns  = React.useMemo<ColumnDef<ItemType>[]>(()=> [
	
		{
		  id: "select",
		  header: ({ table }) => (
			<Checkbox
			  checked={table.getIsAllPageRowsSelected()}
			  onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
			  aria-label="Select all"
			  className="translate-y-[2px]"
			/>
		  ),
		  cell: ({ row }) => (
			<Checkbox
			  checked={row.getIsSelected()}
			  onCheckedChange={(value) => row.toggleSelected(!!value)}
			  aria-label="Select row"
			  className="translate-y-[2px]"
			/>
		  ),
		  enableSorting: false,
		  enableHiding: false,
		},

			{
		id: "Title",
		accessorKey: "Title",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Title" />
		),
		cell: ({ row }) => {
		return <div >{row.original.Title}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "CreatedBy",
		accessorKey: "CreatedBy",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Created By" />
		),
		cell: ({ row }) => {
		return <div >{row.original.CreatedBy}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "Created",
		accessorKey: "Created",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Created" />
		),
		cell: ({ row }) => {
		return <div >{row.original.Created.toLocaleDateString()}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "ModifiedBy",
		accessorKey: "ModifiedBy",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Modified By" />
		),
		cell: ({ row }) => {
		return <div >{row.original.ModifiedBy}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "Modified",
		accessorKey: "Modified",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Modified" />
		),
		cell: ({ row }) => {
		return <div >{row.original.Modified.toLocaleDateString()}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "RoomEmail",
		accessorKey: "RoomEmail",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Room Email" />
		),
		cell: ({ row }) => {
		return <div >{row.original.RoomEmail}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "Appointmentstart",
		accessorKey: "Appointmentstart",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Appointment start" />
		),
		cell: ({ row }) => {
		return <div >{row.original.Appointmentstart.toLocaleDateString()}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "Appointmentend",
		accessorKey: "Appointmentend",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Appointment end" />
		),
		cell: ({ row }) => {
		return <div >{row.original.Appointmentend.toLocaleDateString()}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "Organizer_x0020_Email",
		accessorKey: "Organizer_x0020_Email",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Organizer Email" />
		),
		cell: ({ row }) => {
		return <div >{row.original.Organizer_x0020_Email}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "Status",
		accessorKey: "Status",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
		return <div >{row.original.Status}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "Reference",
		accessorKey: "Reference",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Reference" />
		),
		cell: ({ row }) => {
		return <div >{row.original.Reference}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "Booking_x0020_Web_x0020_Link",
		accessorKey: "Booking_x0020_Web_x0020_Link",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Booking Web Link" />
		),
		cell: ({ row }) => {
		return <div >{row.original.Booking_x0020_Web_x0020_Link}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "Catering_x0020_order_x0020_refer",
		accessorKey: "Catering_x0020_order_x0020_refer",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Catering order reference" />
		),
		cell: ({ row }) => {
		return <div >{row.original.Catering_x0020_order_x0020_refer}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "Stage",
		accessorKey: "Stage",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Stage" />
		),
		cell: ({ row }) => {
		return <div >{row.original.Stage}</div>},
		enableSorting: true,
		enableHiding: true,
	  },	{
		id: "Cost_x0020_Centre",
		accessorKey: "Cost_x0020_Centre",
		header: ({ column }) => (
		  <DataTableColumnHeader column={column} title="Cost Centre" />
		),
		cell: ({ row }) => {
		return <div >{row.original.Cost_x0020_Centre}</div>},
		enableSorting: true,
		enableHiding: true,
	  },

		{
			id: "Link",
			accessorKey: "string1",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Link" />
			),
			cell: ({ row }) => <Link href={"/cava/" + props.site + "/sharepoint/lists/" + props.listName.replaceAll(" ", "") + "/" + row.original.Id}> <Button variant={"link"}>View</Button></Link>,
			enableSorting: false,
			enableHiding: true,
		},
		{
		  id: "actions",
		  cell: ({ row }) => <DataTableRowActions link={""} row={row} />,
		},
	  
	  
	  

	  ],[])

	  const [activeColumns, setactiveColumns] = useState<ColumnDef<ItemType>[]>([])
	  React.useEffect(() => {
		if (!props.viewFields) { 
			setactiveColumns(columns)

		}
		const cols = columns.filter((c) => {
		  if (!props.viewFields) return true
		  if (!props.hideSelect && c.id === "select") return true
		  if (!props.hideLink && c.id === "Link") return true
		  const key = c.id ?? ""
		  return props.viewFields.includes(key as FieldNames)
		})
		setactiveColumns(cols)
	  },[props.viewFields,columns])
	return (<div>
		<TableOfItems 
		
		schema={schema}
		columns={activeColumns}
		data={props.items} />
	</div>)
}



	