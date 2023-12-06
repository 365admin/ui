
	import z from "zod"

		export const listName = "Site Assets"
		export const listURL = "SiteAssets"
		export type FieldNames = "Id"|"Title"|"CreatedBy"|"Created"|"ModifiedBy"|"Modified"|"lcf76f155ced4ddcb4097134ff3c332f"|"MediaServiceImageTags"|"MediaServiceOCR"
	export const dependencies =[]
	

	export function mapLookup(listName:string,item:any) {
		return item ? {LookupId:parseInt(item),LookupValue:"id " + item + " in " + listName  }: null
	}
	export function mapLookupMulti(listName:string,item:any) {

		return null
	}
// Site Assets
	export function map(item:any) {
	
	
	return {
		Id : item.id,
	Title : item.fields.Title,
	eTag : JSON.parse(item.eTag),
	CreatedBy : item.createdBy.user.email ?? item.createdBy.user.displayName,
	Created :new Date(item.createdDateTime),
	ModifiedBy : item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
	Modified : new Date(item.lastModifiedDateTime),	
		lcf76f155ced4ddcb4097134ff3c332f: item.fields.lcf76f155ced4ddcb4097134ff3c332f ? item.fields.lcf76f155ced4ddcb4097134ff3c332f : "",
			MediaServiceOCR: item.fields.MediaServiceOCR ? item.fields.MediaServiceOCR : "",
			}}
	export const schema = z.object({
		CreatedBy : z.string(),
		Created: z.date(),
		ModifiedBy : z.string(),
		Modified: z.date(),
		Id: z.string(),
		eTag : z.string(),
		Title: z.string(),
		
		lcf76f155ced4ddcb4097134ff3c332f : z.string(),
			MediaServiceOCR : z.string(),
			})
	
	export type ItemType = z.infer<typeof schema>
	