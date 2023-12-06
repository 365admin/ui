
	import z from "zod"

		export const listName = "Releases"
		export const listURL = "Lists/Releases"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Releasedatetime"|"Linktopackage"|"Stage"|"Package"|"Accountable"|"Responsible"|"Consult"|"Inform"|"Test_x0020_Environment"|"Production_x0020_Environment"|"Archived"|"Testplan"|"Sign_x002d_off_x0020_status"
	export const dependencies =["Packages","Environments","Environments"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Releases
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		Releasedatetime: new Date(item.fields.Releasedatetime),
			Linktopackage: item.fields.Linktopackage,
			Stage: item.fields.Stage ?? "",
			Package: mapLookup("Packages",item.fields.PackageLookupId),
			Accountable: item.fields.Accountable ?? "",
			Responsible: item.fields.Responsible ?? "",
			Consult: item.fields.Consult ?? "",
			Inform: item.fields.Inform ?? "",
			Test_x0020_Environment: mapLookup("Environments",item.fields.Test_x0020_EnvironmentLookupId),
			Production_x0020_Environment: mapLookup("Environments",item.fields.Production_x0020_EnvironmentLookupId),
			Archived: item.fields.Archived ? true : false,
			Testplan: item.fields.Testplan ? item.fields.Testplan : "",
			Sign_x002d_off_x0020_status: item.fields.Sign_x002d_off_x0020_status ? item.fields.Sign_x002d_off_x0020_status : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		Releasedatetime : z.date(),
			Linktopackage : z.string().nullable(),
			Stage : z.string().nullable(),
			Package : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Accountable : z.string().nullable(),
			Responsible : z.string().nullable(),
			Consult : z.string().array().nullable(),
			Inform : z.string().array().nullable(),
			Test_x0020_Environment : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Production_x0020_Environment : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Archived : z.boolean(),
			Testplan : z.string(),
			Sign_x002d_off_x0020_status : z.string(),
			})
	
	export type ItemType = z.infer<typeof schema>
	