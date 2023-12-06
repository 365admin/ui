
	import z from "zod"

		export const listName = "Items"
		export const listURL = "Lists/Items"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Price"|"Description"|"Comments"|"Group"|"Provider"|"Currency"
	export const dependencies =["ItemGroups","Catering Providers","Currency"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Items
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		Price: item.fields.Price,
			Description: item.fields.Description ? item.fields.Description : "",
			Comments: item.fields.Comments ? item.fields.Comments : "",
			Group: mapLookupMulti("ItemGroups",item.fields.GroupLookupId),
			Provider: mapLookup("Catering Providers",item.fields.ProviderLookupId),
			Currency: mapLookup("Currency",item.fields.CurrencyLookupId),
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		Price : z.number(),
			Description : z.string(),
			Comments : z.string(),
			Group : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			Provider : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Currency : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			})
	
	export type ItemType = z.infer<typeof schema>
	