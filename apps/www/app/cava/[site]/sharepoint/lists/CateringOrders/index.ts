
	import z from "zod"

		export const listName = "Catering Orders"
		export const listURL = "Lists/Catering Orders"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"RoomEmail"|"Appointmentstart"|"Appointmentend"|"OrderData"|"Organizer_x0020_Email"|"Appointmentdata"|"Status"|"Visitor_x0020_Registrations"|"Equipment_x0020_Orders"|"Reference"|"Booking_x0020_Web_x0020_Link"|"Catering_x0020_order_x0020_refer"|"Stage"|"Comments"|"Cost_x0020_Centre"|"ConfirmationHTML"|"Site"|"Room"
	export const dependencies =["Room Sites","Rooms"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Catering Orders
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		RoomEmail: item.fields.RoomEmail ? item.fields.RoomEmail : "",
			Appointmentstart: new Date(item.fields.Appointmentstart),
			Appointmentend: new Date(item.fields.Appointmentend),
			OrderData: item.fields.OrderData ? item.fields.OrderData : "",
			Organizer_x0020_Email: item.fields.Organizer_x0020_Email ? item.fields.Organizer_x0020_Email : "",
			Appointmentdata: item.fields.Appointmentdata ? item.fields.Appointmentdata : "",
			Status: item.fields.Status ?? "",
			Visitor_x0020_Registrations: item.fields.Visitor_x0020_Registrations ? item.fields.Visitor_x0020_Registrations : "",
			Equipment_x0020_Orders: item.fields.Equipment_x0020_Orders ? item.fields.Equipment_x0020_Orders : "",
			Reference: item.fields.Reference ? item.fields.Reference : "",
			Booking_x0020_Web_x0020_Link: item.fields.Booking_x0020_Web_x0020_Link ? item.fields.Booking_x0020_Web_x0020_Link : "",
			Catering_x0020_order_x0020_refer: item.fields.Catering_x0020_order_x0020_refer ? item.fields.Catering_x0020_order_x0020_refer : "",
			Stage: item.fields.Stage ? item.fields.Stage : "",
			Comments: item.fields.Comments ? item.fields.Comments : "",
			Cost_x0020_Centre: item.fields.Cost_x0020_Centre ? item.fields.Cost_x0020_Centre : "",
			ConfirmationHTML: item.fields.ConfirmationHTML ? item.fields.ConfirmationHTML : "",
			Site: mapLookup("Room Sites",item.fields.SiteLookupId),
			Room: mapLookup("Rooms",item.fields.RoomLookupId),
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		RoomEmail : z.string(),
			Appointmentstart : z.date(),
			Appointmentend : z.date(),
			OrderData : z.string(),
			Organizer_x0020_Email : z.string(),
			Appointmentdata : z.string(),
			Status : z.string().nullable(),
			Visitor_x0020_Registrations : z.string(),
			Equipment_x0020_Orders : z.string(),
			Reference : z.string(),
			Booking_x0020_Web_x0020_Link : z.string(),
			Catering_x0020_order_x0020_refer : z.string(),
			Stage : z.string(),
			Comments : z.string(),
			Cost_x0020_Centre : z.string(),
			ConfirmationHTML : z.string(),
			Site : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			Room : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).nullable(),
			})
	
	export type ItemType = z.infer<typeof schema>
	