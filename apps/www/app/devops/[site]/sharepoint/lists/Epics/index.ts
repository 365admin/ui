
	import z from "zod"

		export const listName = "Epics"
		export const listURL = "Lists/Epics"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Features"|"Features_x003a__x0020_Cost"|"Nextmilestone"
	export const dependencies =["Features","Features"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Epics
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		Features: mapLookupMulti("Features",item.fields.FeaturesLookupId),
			Features_x003a__x0020_Cost: mapLookupMulti("Features",item.fields.Features_x003a__x0020_CostLookupId),
			Nextmilestone: new Date(item.fields.Nextmilestone),
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		Features : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			Features_x003a__x0020_Cost : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			Nextmilestone : z.date(),
			})
	
	export type ItemType = z.infer<typeof schema>
	