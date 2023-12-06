
	import z from "zod"

		export const listName = "Catering Orders Items"
		export const listURL = "Lists/Catering Orders Items"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Item"|"DeliveryDateandTime"|"Provider"|"Quantity"|"Pricepritem"|"Catering_x0020_Order"|"Status"|"DeliverTo"|"Room"|"CostCentre"
	export const dependencies =["Items","Catering Providers","Catering Orders","Rooms"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Catering Orders Items
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		Item: mapLookup("Items",item.fields.ItemLookupId),
			DeliveryDateandTime: new Date(item.fields.DeliveryDateandTime),
			Provider: mapLookup("Catering Providers",item.fields.ProviderLookupId),
			Quantity: item.fields.Quantity,
			Pricepritem: item.fields.Pricepritem,
			Catering_x0020_Order: mapLookup("Catering Orders",item.fields.Catering_x0020_OrderLookupId),
			Status: item.fields.Status ?? "",
			DeliverTo: item.fields.DeliverTo ? item.fields.DeliverTo : "",
			Room: mapLookup("Rooms",item.fields.RoomLookupId),
			CostCentre: item.fields.CostCentre ? item.fields.CostCentre : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		Item : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			DeliveryDateandTime : z.date(),
			Provider : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Quantity : z.number(),
			Pricepritem : z.number(),
			Catering_x0020_Order : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Status : z.string().nullable(),
			DeliverTo : z.string(),
			Room : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			CostCentre : z.string(),
			})
	
	export type ItemType = z.infer<typeof schema>
	