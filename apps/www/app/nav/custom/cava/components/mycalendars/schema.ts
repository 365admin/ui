export interface Root {
    "@odata.context": string
    value: Value[]
    "@odata.nextLink": string
  }
  
  export interface Value {
    id: string
    name: string
    color: string
    hexColor: string
    isDefaultCalendar: boolean
    changeKey: string
    canShare: boolean
    canViewPrivateItems: boolean
    canEdit: boolean
    allowedOnlineMeetingProviders: string[]
    defaultOnlineMeetingProvider: string
    isTallyingResponses: boolean
    isRemovable: boolean
    owner: Owner
  }
  
  export interface Owner {
    name: string
    address: string
  }
  