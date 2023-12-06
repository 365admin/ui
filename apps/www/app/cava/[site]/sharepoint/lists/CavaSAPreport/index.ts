
	import z from "zod"

		export const listName = "Cava SAP report"
		export const listURL = "Lists/Cava SAP report"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"field_0"|"field_1"|"field_2"|"field_4"|"field_5"|"field_6"|"field_7"|"field_8"|"field_9"
	export const dependencies =[]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Cava SAP report
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		field_0: item.fields.field_0,
			field_1: item.fields.field_1,
			field_2: item.fields.field_2,
			field_4: item.fields.field_4 ? item.fields.field_4 : "",
			field_5: item.fields.field_5 ? item.fields.field_5 : "",
			field_6: item.fields.field_6,
			field_7: item.fields.field_7,
			field_8: item.fields.field_8,
			field_9: item.fields.field_9,
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		field_0 : z.number(),
			field_1 : z.number(),
			field_2 : z.number(),
			field_4 : z.string(),
			field_5 : z.string(),
			field_6 : z.number(),
			field_7 : z.number(),
			field_8 : z.number(),
			field_9 : z.number(),
			})
	
	export type ItemType = z.infer<typeof schema>
	