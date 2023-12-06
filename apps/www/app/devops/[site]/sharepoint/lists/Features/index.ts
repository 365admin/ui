
	import z from "zod"

		export const listName = "Features"
		export const listURL = "Lists/Features"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Cost"|"Nextmilestone"|"UseCases"|"Use_x0020_Cases_x003a__x0020_Est"|"Service"|"Responsible"|"Link"
	export const dependencies =["Request tracker","Request tracker","Services"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Features
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		Cost: item.fields.Cost,
			Nextmilestone: new Date(item.fields.Nextmilestone),
			UseCases: mapLookupMulti("Request tracker",item.fields.UseCasesLookupId),
			Use_x0020_Cases_x003a__x0020_Est: mapLookup("Request tracker",item.fields.Use_x0020_Cases_x003a__x0020_EstLookupId),
			Service: mapLookup("Services",item.fields.ServiceLookupId),
			Responsible: item.fields.Responsible ?? "",
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
		
		Cost : z.number(),
			Nextmilestone : z.date(),
			UseCases : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			Use_x0020_Cases_x003a__x0020_Est : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Service : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Responsible : z.string().nullable(),
			Link : z.string().nullable(),
			})
	
	export type ItemType = z.infer<typeof schema>
	