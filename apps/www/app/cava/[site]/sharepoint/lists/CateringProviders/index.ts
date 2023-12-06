
	import z from "zod"

		export const listName = "Catering Providers"
		export const listURL = "Lists/Catering Providers"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"email"|"OrderPage"|"Notes"|"Isstandalone"|"LocalCurrency"|"Opening"|"Closing"|"Is_x0020_Reception"
	export const dependencies =[]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Catering Providers
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		email: item.fields.email ? item.fields.email : "",
			OrderPage: item.fields.OrderPage ? item.fields.OrderPage : "",
			Notes: item.fields.Notes ? item.fields.Notes : "",
			Isstandalone: item.fields.Isstandalone ? true : false,
			LocalCurrency: item.fields.LocalCurrency ? item.fields.LocalCurrency : "",
			Opening: item.fields.Opening,
			Closing: item.fields.Closing,
			Is_x0020_Reception: item.fields.Is_x0020_Reception ? true : false,
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		email : z.string(),
			OrderPage : z.string(),
			Notes : z.string(),
			Isstandalone : z.boolean(),
			LocalCurrency : z.string(),
			Opening : z.number(),
			Closing : z.number(),
			Is_x0020_Reception : z.boolean(),
			})
	
	export type ItemType = z.infer<typeof schema>
	