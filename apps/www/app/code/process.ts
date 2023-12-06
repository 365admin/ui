export interface MagicApp {
    magicapp: string
    metadata: Metadata
    stages: Stage[]
    Events: Events
    roles: Role[]
  }
  
  export interface Metadata {
    app: string
    name: string
  }
  
  export interface Stage {
    stage: string
    type: string
    name?: string
    inputs?: Input[]
    outputs?: Output[]
    tasks?: Task[]
    conditions?: Conditions
    variants?: Variants
  }
  
  export interface Input {
    suggestion: any
  }
  
  export interface Output {
    instruction: any
    agenda: any
    invitation: any
    guide: any
  }
  
  export interface Task {
    "order catering"?: OrderCatering
    "return badge"?: ReturnBadge
    "send selfservice link"?: SendSelfserviceLink
    "prepare agenda"?: PrepareAgenda
    "approve agenda"?: ApproveAgenda
    "prepare invitation"?: PrepareInvitation
    "reserve resources"?: ReserveResources
    "invite attendees"?: InviteAttendees
    "send guideance"?: SendGuideance
    "register visitor"?: RegisterVisitor
    "get wifi code"?: GetWifiCode
    "handed out badge"?: HandedOutBadge
    "inform host": any
    who?: string
    "receive visitor"?: ReceiveVisitor
    "prepare room"?: PrepareRoom
    "cleanup room"?: CleanupRoom
    "prepare food"?: PrepareFood
    "deliver food"?: DeliverFood
    "prepare drinks"?: PrepareDrinks
    "deliver drinks"?: DeliverDrinks
    "start meeting"?: StartMeeting
    "run meeting"?: RunMeeting
    "end meeting"?: EndMeeting
    "prepare minutes"?: PrepareMinutes
    "approve minutes"?: Minute[]
    "archive meeting"?: ArchiveMeeting
    "prepare invoice"?: PrepareInvoice
    "send invoice"?: SendInvoice
    "receive payment"?: ReceivePayment
  }
  
  export interface OrderCatering {
    who: string
    when: number
    frequency: string
  }
  
  export interface ReturnBadge {
    how: How
    who: string
  }
  
  export interface How {
    title: string
    tool: string
    form: string
    path: string
  }
  
  export interface SendSelfserviceLink {
    who: string
    when: string
  }
  
  export interface PrepareAgenda {
    who: string
  }
  
  export interface ApproveAgenda {
    who: string
  }
  
  export interface PrepareInvitation {
    who: string
  }
  
  export interface ReserveResources {
    who: string
  }
  
  export interface InviteAttendees {
    who: string
  }
  
  export interface SendGuideance {
    who: string
    when: string[]
  }
  
  export interface RegisterVisitor {
    who: string
    selfservice: string
  }
  
  export interface GetWifiCode {
    who: string
  }
  
  export interface HandedOutBadge {
    who: string
  }
  
  export interface ReceiveVisitor {
    who: string
  }
  
  export interface PrepareRoom {
    when: string
    who: string
  }
  
  export interface CleanupRoom {
    when: string
    who: string
  }
  
  export interface PrepareFood {
    when: string
    who: string
    timecontraints: Timecontraints
  }
  
  export interface Timecontraints {
    days: number
    cutovertime: number
  }
  
  export interface DeliverFood {
    when: string
    who: string
  }
  
  export interface PrepareDrinks {
    when: string
    who: string
  }
  
  export interface DeliverDrinks {
    when: string
    who: string
  }
  
  export interface StartMeeting {
    who: string
  }
  
  export interface RunMeeting {
    who: string
    repeat: Repeat
  }
  
  export interface Repeat {
    "each agenda item": EachAgendaItem
  }
  
  export interface EachAgendaItem {
    who: string
    timebox: string
    decision: string
    vote: string
    information: string
  }
  
  export interface EndMeeting {
    who: string
  }
  
  export interface PrepareMinutes {
    who: string
  }
  
  export interface Minute {
    who: string
  }
  
  export interface ArchiveMeeting {
    who: string
  }
  
  export interface PrepareInvoice {
    who: string
  }
  
  export interface SendInvoice {
    who: string
  }
  
  export interface ReceivePayment {
    who: string
  }
  
  export interface Conditions {
    pending: Pending
    final: Final
  }
  
  export interface Pending {
    "receive confirmations": any
  }
  
  export interface Final {
    "confirm resource": any
  }
  
  export interface Variants {
    car: Car
    "public transportation": any
    cycle: any
    walk: any
  }
  
  export interface Car {
    tasks: Task2[]
  }
  
  export interface Task2 {
    "issue parking permit"?: IssueParkingPermit
    parking?: Parking
  }
  
  export interface IssueParkingPermit {
    who: string
  }
  
  export interface Parking {
    who: string
  }
  
  export interface Events {
    name: string
    exception: Exception[]
  }
  
  export interface Exception {
    meeting_cancelled: any
    tasks: Task3[]
    meeting_rescheduled: any
    meeting_delayed: any
    attendee_cancellation: any
    resource_unavailable: any
    attendee_delayed: any
    attendee_checkin: any
    attendee_notcheckedout: any
  }
  
  export interface Task3 {
    "cancel meeting"?: CancelMeeting
    "reschedule meeting"?: RescheduleMeeting
    "cancel invitation"?: CancelInvitation
    "reschedule invitation"?: RescheduleInvitation
    "cancel resources"?: CancelResources
    "reschedule resources"?: RescheduleResources
    "notify attendees"?: NotifyAttendees
    "notify resources"?: NotifyResources
    "delay resources"?: DelayResources
    "find replacement resource"?: FindReplacementResource
    "notify host"?: NotifyHost
    notify?: Notify
  }
  
  export interface CancelMeeting {
    who: string
  }
  
  export interface RescheduleMeeting {
    who: string
  }
  
  export interface CancelInvitation {
    who: string
  }
  
  export interface RescheduleInvitation {
    who: string
  }
  
  export interface CancelResources {
    who: string
  }
  
  export interface RescheduleResources {
    who: string
  }
  
  export interface NotifyAttendees {
    who: string
  }
  
  export interface NotifyResources {
    who: string
  }
  
  export interface DelayResources {
    who: string
  }
  
  export interface FindReplacementResource {
    who: string
  }
  
  export interface NotifyHost {
    who: string
  }
  
  export interface Notify {
    who: string[]
  }
  
  export interface Role {
    name: string
    description: string
  }
  