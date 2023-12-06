
	import z from "zod"

		export const listName = "Catering Orders Invoices"
		export const listURL = "Lists/Catering Orders Invoices"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Amount"|"InvoiceHTML"|"Sales_x0020_Order"|"CostCentre"|"Invoicedto"
	export const dependencies =["Catering Orders"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Catering Orders Invoices
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		Amount: item.fields.Amount,
			InvoiceHTML: item.fields.InvoiceHTML ? item.fields.InvoiceHTML : "",
			Sales_x0020_Order: mapLookup("Catering Orders",item.fields.Sales_x0020_OrderLookupId),
			CostCentre: item.fields.CostCentre ? item.fields.CostCentre : "",
			Invoicedto: item.fields.Invoicedto ?? "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		Amount : z.number(),
			InvoiceHTML : z.string(),
			Sales_x0020_Order : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			CostCentre : z.string(),
			Invoicedto : z.string().nullable(),
			})
	
	export type ItemType = z.infer<typeof schema>
	