
	import z from "zod"

		export const listName = "Request tracker"
		export const listURL = "Lists/Request tracker"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Estimated_x0020_hours_x0020_to_x"|"Description"|"Priority"|"Status"|"Assignedto0"|"DateReported"|"IssueSource"|"Images"|"Issueloggedby"|"Archived"|"SuggestedSolutions"|"PrioritySortOrder"
	export const dependencies =[]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Request tracker
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		Estimated_x0020_hours_x0020_to_x: item.fields.Estimated_x0020_hours_x0020_to_x,
			Description: item.fields.Description ? item.fields.Description : "",
			Priority: item.fields.Priority ?? "",
			Status: item.fields.Status ?? "",
			Assignedto0: item.fields.Assignedto0 ?? "",
			DateReported: new Date(item.fields.DateReported),
			IssueSource: item.fields.IssueSource,
			Issueloggedby: item.fields.Issueloggedby ?? "",
			Archived: item.fields.Archived ?? "",
			SuggestedSolutions: item.fields.SuggestedSolutions ? item.fields.SuggestedSolutions : "",
			PrioritySortOrder: item.fields.PrioritySortOrder,
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		Estimated_x0020_hours_x0020_to_x : z.number(),
			Description : z.string(),
			Priority : z.string().nullable(),
			Status : z.string().nullable(),
			Assignedto0 : z.string().nullable(),
			DateReported : z.date(),
			IssueSource : z.string().nullable(),
			Issueloggedby : z.string().nullable(),
			Archived : z.string().nullable(),
			SuggestedSolutions : z.string(),
			PrioritySortOrder : z.number(),
			})
	
	export type ItemType = z.infer<typeof schema>
	