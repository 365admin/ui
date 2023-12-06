export interface Root {
    "@odata.context": string
    value: Value[]
  }
  
  export interface Value {
    "@odata.etag": string
    createdDateTime: string
    eTag: string
    id: string
    lastModifiedDateTime: string
    webUrl: string
    createdBy: CreatedBy
    lastModifiedBy: LastModifiedBy
    parentReference: ParentReference
    contentType: ContentType
    "fields@odata.context": string
    fields: Fields
  }
  
  export interface CreatedBy {
    user: User
  }
  
  export interface User {
    email: string
    id: string
    displayName: string
  }
  
  export interface LastModifiedBy {
    user: User2
  }
  
  export interface User2 {
    email: string
    id: string
    displayName: string
  }
  
  export interface ParentReference {
    id: string
    siteId: string
  }
  
  export interface ContentType {
    id: string
    name: string
  }
  
  export interface Fields {
    "@odata.etag": string
    Title: string
    LinkTitle: string
    JSON: string
    Country: string
    Unit: string
    Ring: string
    id: string
    ContentType: string
    Modified: string
    Created: string
    AuthorLookupId: string
    EditorLookupId: string
    _UIVersionString: string
    Attachments: boolean
    Edit: string
    LinkTitleNoMenu: string
    ItemChildCount: string
    FolderChildCount: string
    _ComplianceFlags: string
    _ComplianceTag: string
    _ComplianceTagWrittenTime: string
    _ComplianceTagUserId: string
  }
  