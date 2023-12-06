import z from "zod"

export const listName = "Companies"
export const listURL = "Lists/Companies"
export type FieldNames =
  | "Id"
  | "Title"
  | "CreatedBy"
  | "Created"
  | "ModifiedBy"
  | "Modified"
  | "field_1"
  | "field_2"
  | "ContactPerson"
  | "PrimaryLocation"
export const dependencies = ["Locations"]

export function mapLookup(listName: string, item: any) {
  return item
    ? {
        LookupId: parseInt(item),
        LookupValue: "id " + item + " in " + listName,
      }
    : null
}
export function mapLookupMulti(listName: string, item: any) {
  return null
}
// Companies
export function map(item: any) {
  return {
    Id: item.id,
    Title: item.fields.Title,
    eTag: JSON.parse(item.eTag),
    CreatedBy: item.createdBy.user.email ?? item.createdBy.user.displayName,
    Created: new Date(item.createdDateTime),
    ModifiedBy:
      item.lastModifiedBy.user.email ?? item.lastModifiedBy.user.displayName,
    Modified: new Date(item.lastModifiedDateTime),
    field_1: item.fields.field_1 ? item.fields.field_1 : "",
    field_2: item.fields.field_2 ? item.fields.field_2 : "",
    ContactPerson: item.fields.ContactPerson ?? "",
    PrimaryLocation: mapLookup(
      "Locations",
      item.fields.PrimaryLocationLookupId
    ),
  }
}
export const schema = z.object({
  CreatedBy: z.string(),
  Created: z.date(),
  ModifiedBy: z.string(),
  Modified: z.date(),
  Id: z.string(),
  eTag: z.string(),
  Title: z.string(),

  field_1: z.string(),
  field_2: z.string(),
  ContactPerson: z.string().nullable(),
  PrimaryLocation: z
    .object({
      LookupId: z.number(),
      LookupValue: z.string(),
    })
    .nullable(),
})

export type ItemType = z.infer<typeof schema>
