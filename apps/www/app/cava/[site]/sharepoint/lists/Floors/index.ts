
	import z from "zod"

		export const listName = "Floors"
		export const listURL = "Lists/Floors"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"FloorNumber"|"FloorPlan"|"HasWorkspaces"|"WayfindingInformation"|"Workspaces"|"Rooms"|"Rooms_x003a__x0020_Email"|"Rooms_x003a__x0020_Capacity"|"ProvisioningStatus"
	export const dependencies =["Workspaces","Rooms","Rooms","Rooms"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Floors
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		FloorNumber: item.fields.FloorNumber,
			FloorPlan: item.fields.FloorPlan ? item.fields.FloorPlan : "",
			HasWorkspaces: item.fields.HasWorkspaces ? true : false,
			WayfindingInformation: item.fields.WayfindingInformation ? item.fields.WayfindingInformation : "",
			Workspaces: mapLookupMulti("Workspaces",item.fields.WorkspacesLookupId),
			Rooms: mapLookupMulti("Rooms",item.fields.RoomsLookupId),
			Rooms_x003a__x0020_Email: mapLookupMulti("Rooms",item.fields.Rooms_x003a__x0020_EmailLookupId),
			Rooms_x003a__x0020_Capacity: mapLookupMulti("Rooms",item.fields.Rooms_x003a__x0020_CapacityLookupId),
			ProvisioningStatus: item.fields.ProvisioningStatus ?? "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		FloorNumber : z.number(),
			FloorPlan : z.string(),
			HasWorkspaces : z.boolean(),
			WayfindingInformation : z.string(),
			Workspaces : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			Rooms : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			Rooms_x003a__x0020_Email : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			Rooms_x003a__x0020_Capacity : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			ProvisioningStatus : z.string().nullable(),
			})
	
	export type ItemType = z.infer<typeof schema>
	