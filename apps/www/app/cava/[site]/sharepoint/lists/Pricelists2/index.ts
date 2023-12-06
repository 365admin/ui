
	import z from "zod"

		export const listName = "Pricelists2"
		export const listURL = "Lists/Pricelists"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Location"|"Item_x0020_Groups"|"Provider"|"Delivery_x0020_Instructions_x002"|"Deliverto"
	export const dependencies =["Locations","ItemGroups","Catering Providers"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Pricelists2
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		Location: mapLookup("Locations",item.fields.LocationLookupId),
			Item_x0020_Groups: mapLookupMulti("ItemGroups",item.fields.Item_x0020_GroupsLookupId),
			Provider: mapLookup("Catering Providers",item.fields.ProviderLookupId),
			Delivery_x0020_Instructions_x002: item.fields.Delivery_x0020_Instructions_x002 ? item.fields.Delivery_x0020_Instructions_x002 : "",
			Deliverto: item.fields.Deliverto ? item.fields.Deliverto : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		Location : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Item_x0020_Groups : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			Provider : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Delivery_x0020_Instructions_x002 : z.string(),
			Deliverto : z.string(),
			})
	
	export type ItemType = z.infer<typeof schema>
	