
	import z from "zod"

		export const listName = "Room Sites"
		export const listURL = "Lists/Room Sites"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"MailRequestto"|"Integration"|"IntegratedWith"|"Name_x0020_prefix"|"IntegrationStatus"|"VisitorSystem"|"Creategroupforsite"|"VisitorSystemParameters"|"Title_x0020_prefix"|"Country"
	export const dependencies =["Countries"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Room Sites
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		MailRequestto: item.fields.MailRequestto ? item.fields.MailRequestto : "",
			Integration: item.fields.Integration ? item.fields.Integration : "",
			IntegratedWith: item.fields.IntegratedWith ? item.fields.IntegratedWith : "",
			Name_x0020_prefix: item.fields.Name_x0020_prefix ? item.fields.Name_x0020_prefix : "",
			IntegrationStatus: item.fields.IntegrationStatus ? item.fields.IntegrationStatus : "",
			VisitorSystem: item.fields.VisitorSystem ? item.fields.VisitorSystem : "",
			Creategroupforsite: item.fields.Creategroupforsite ? true : false,
			VisitorSystemParameters: item.fields.VisitorSystemParameters ? item.fields.VisitorSystemParameters : "",
			Title_x0020_prefix: item.fields.Title_x0020_prefix ? item.fields.Title_x0020_prefix : "",
			Country: mapLookup("Countries",item.fields.CountryLookupId),
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		MailRequestto : z.string(),
			Integration : z.string(),
			IntegratedWith : z.string(),
			Name_x0020_prefix : z.string(),
			IntegrationStatus : z.string(),
			VisitorSystem : z.string(),
			Creategroupforsite : z.boolean(),
			VisitorSystemParameters : z.string(),
			Title_x0020_prefix : z.string(),
			Country : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			})
	
	export type ItemType = z.infer<typeof schema>
	