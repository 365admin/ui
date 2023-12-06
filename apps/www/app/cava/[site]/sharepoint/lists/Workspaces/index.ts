
	import z from "zod"

		export const listName = "Workspaces"
		export const listURL = "Lists/Workspaces"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"LocationonFloor"|"FloorMapZoom"|"Desks"|"Desks_x003a__x0020_Email"|"Desks_x003a__x0020_Location_x002"
	export const dependencies =["Desks","Desks","Desks"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Workspaces
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		LocationonFloor: item.fields.LocationonFloor ? item.fields.LocationonFloor : "",
			FloorMapZoom: item.fields.FloorMapZoom ? item.fields.FloorMapZoom : "",
			Desks: mapLookupMulti("Desks",item.fields.DesksLookupId),
			Desks_x003a__x0020_Email: mapLookupMulti("Desks",item.fields.Desks_x003a__x0020_EmailLookupId),
			Desks_x003a__x0020_Location_x002: mapLookupMulti("Desks",item.fields.Desks_x003a__x0020_Location_x002LookupId),
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		LocationonFloor : z.string(),
			FloorMapZoom : z.string(),
			Desks : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			Desks_x003a__x0020_Email : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			Desks_x003a__x0020_Location_x002 : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			})
	
	export type ItemType = z.infer<typeof schema>
	