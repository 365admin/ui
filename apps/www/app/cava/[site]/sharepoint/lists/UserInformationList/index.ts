
	import z from "zod"

		export const listName = "User Information List"
		export const listURL = "User Information List"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Name"|"IsSiteAdmin"|"EMail"|"Notes"|"ContentType"
	export const dependencies =[]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// User Information List
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		Name: item.fields.Name ? item.fields.Name : "",
			IsSiteAdmin: item.fields.IsSiteAdmin ? true : false,
			EMail: item.fields.EMail ? item.fields.EMail : "",
			Notes: item.fields.Notes ? item.fields.Notes : "",
			ContentType: item.fields.ContentType ? item.fields.ContentType : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		Name : z.string(),
			IsSiteAdmin : z.boolean(),
			EMail : z.string(),
			Notes : z.string(),
			ContentType : z.string(),
			})
	
	export type ItemType = z.infer<typeof schema>
	