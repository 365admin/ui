
	import z from "zod"

		export const listName = "Services"
		export const listURL = "Lists/Products"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Owner"|"TechnicalContactPerson"|"BusinessCritical"|"Link"
	export const dependencies =[]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Services
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		Owner: item.fields.Owner ?? "",
			TechnicalContactPerson: item.fields.TechnicalContactPerson ?? "",
			BusinessCritical: item.fields.BusinessCritical ?? "",
			Link: item.fields.Link,
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		Owner : z.string().nullable(),
			TechnicalContactPerson : z.string().nullable(),
			BusinessCritical : z.string().nullable(),
			Link : z.string().nullable(),
			})
	
	export type ItemType = z.infer<typeof schema>
	