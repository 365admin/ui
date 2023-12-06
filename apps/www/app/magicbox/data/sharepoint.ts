export interface Root {
    "@odata.context": string
    "@microsoft.graph.tips": string
    value: ToolbarItem[]
  }
  
  export interface ToolbarItem {
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
    fields: ToolbarItemFields
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
    id?: string
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
  
  export interface ToolbarItemFields {
    "@odata.etag": string
    Title: string
    ToolbarLookupId?: string
    SortOrder: number
    Color: string
    Description?: string
    Icon: Icon
    slug: string
    Text_x0020_Color: string
    Link_x0020_URL: LinkX0020Url
    Embed_x0020_URL?: EmbedX0020Url
    Openin?: string
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
    LinkTitle: string
    ItemChildCount: string
    FolderChildCount: string
    _ComplianceFlags: string
    _ComplianceTag: string
    _ComplianceTagWrittenTime: string
    _ComplianceTagUserId: string
    Script?: string
    Supporteddevices?: string[]
    SupportedNetwork?: string[]
    SupportedUsers?: string[]
    SupportingProcesses?: string[]
    ResponsibleLookupId?: string
  }
  
  export interface Icon {
    Description: string
    Url: string
  }
  
  export interface LinkX0020Url {
    Description: string
    Url: string
  }
  
  export interface EmbedX0020Url {
    Description: string
    Url: string
  }
  