
	import z from "zod"

		export const listName = "Locations"
		export const listURL = "Lists/Locations"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"Street"|"City"|"State"|"PostalCode"|"CountryOrRegion"|"Buildings"|"Latitude"|"Longitude"|"Companiesonthislocation"
	export const dependencies =["Buildings","Companies"]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Locations
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		Street: item.fields.Street ? item.fields.Street : "",
			City: item.fields.City ? item.fields.City : "",
			State: item.fields.State ? item.fields.State : "",
			PostalCode: item.fields.PostalCode ? item.fields.PostalCode : "",
			CountryOrRegion: item.fields.CountryOrRegion ? item.fields.CountryOrRegion : "",
			Buildings: mapLookupMulti("Buildings",item.fields.BuildingsLookupId),
			Latitude: item.fields.Latitude ? item.fields.Latitude : "",
			Longitude: item.fields.Longitude ? item.fields.Longitude : "",
			Companiesonthislocation: mapLookupMulti("Companies",item.fields.CompaniesonthislocationLookupId),
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		Street : z.string(),
			City : z.string(),
			State : z.string(),
			PostalCode : z.string(),
			CountryOrRegion : z.string(),
			Buildings : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			Latitude : z.string(),
			Longitude : z.string(),
			Companiesonthislocation : z.object({
				LookupId:z.number(),
				LookupValue:z.string()
			  }).array().nullable(),
			})
	
	export type ItemType = z.infer<typeof schema>
	