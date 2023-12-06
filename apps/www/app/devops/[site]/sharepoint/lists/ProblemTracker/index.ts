
	import z from "zod"

		export const listName = "Problem Tracker"
		export const listURL = "Lists/Problem Tracker"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Issue"|"Problem"|"SuggestedSolution"|"Archived"|"Status"
	export const dependencies =["Issue tracker"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Problem Tracker
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		Issue: mapLookup("Issue tracker",item.fields.IssueLookupId),
			Problem: item.fields.Problem ? item.fields.Problem : "",
			SuggestedSolution: item.fields.SuggestedSolution ? item.fields.SuggestedSolution : "",
			Archived: item.fields.Archived ? true : false,
			Status: item.fields.Status ?? "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		Issue : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Problem : z.string(),
			SuggestedSolution : z.string(),
			Archived : z.boolean(),
			Status : z.string().nullable(),
			})
	
	export type ItemType = z.infer<typeof schema>
	