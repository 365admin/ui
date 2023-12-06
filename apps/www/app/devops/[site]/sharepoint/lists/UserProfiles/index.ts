
	import z from "zod"

		export const listName = "User Profiles"
		export const listURL = "Lists/User Profiles"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"JSON"|"Country"|"Unit"|"Ring"
	export const dependencies =[]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// User Profiles
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		JSON: item.fields.JSON ? item.fields.JSON : "",
			Country: item.fields.Country ? item.fields.Country : "",
			Unit: item.fields.Unit ? item.fields.Unit : "",
			Ring: item.fields.Ring ?? "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		JSON : z.string(),
			Country : z.string(),
			Unit : z.string(),
			Ring : z.string().nullable(),
			})
	
	export type ItemType = z.infer<typeof schema>
	