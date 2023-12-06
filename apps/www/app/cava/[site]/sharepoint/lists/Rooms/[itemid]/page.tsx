
"use client"

import * as React from "react"
import { Button } from "@/registry/new-york/ui/button"
import { MagicboxContext } from "@/app/magicbox-context"
import {
	useSharePointList,
	useSharePointListItem,
	version,

} from "@/app/sharepoint"

import { ItemType, dependencies, listName, schema, map, listURL } from ".."
import { ItemForm } from "../form"
import Link from "next/link"
import { LimitAccessToRoomForm } from "../limitaccessform"
import { PageHeader } from "@/app/cava/[site]/components/pageheader"

export default function ItemPage({
	params,
}: {
	params: { itemid: string; site: string }
}) {
	const magicbox = React.useContext(MagicboxContext)
	const { site, itemid } = params

	const { item, error, isLoading, itemRaw } = useSharePointListItem<ItemType>(
		magicbox.session?.accessToken ?? "",
		magicbox.tenant,
		site,
		listName,
		itemid,
		map,
		schema,
	)

	return (
		<div>
			<div className="container" style={{ minHeight: "100vh" }}>
				{error && <div className="text-red-600">{error}</div>}
				{isLoading && <div className="text-green-600">Loading...</div>}
				
				<div className="mt-3">
				<PageHeader title={item?.Title ?? ""} />
				</div>
				<div className="flex">
					<div className="pl-5 text-xs">List: {listName} | Created: {item?.Created?.toLocaleDateString()} by {item?.CreatedBy} | Modified: {item?.Modified?.toLocaleDateString()} by {item?.ModifiedBy} </div>
					<div className="grow" />
					<Button variant={"link"}><Link target="_blank" href={"https://" + magicbox.tenant + ".sharepoint.com/sites/" + site + "/" + listURL + "/DispForm.aspx?ID=" + itemid}>View in SharePoint</Link></Button>
				</div>
				<div>
					<LimitAccessToRoomForm site={site} item={item} backPath={`/cava/${site}/role/admin/rooms`} />

				</div>
				{/* <ItemForm item={item} />
		  <pre>
				{JSON.stringify(item, null, 2)}
			</pre>
			<pre >
				{JSON.stringify(itemRaw, null, 2)}
			</pre>*/}
			</div>
		</div>
	)

}

