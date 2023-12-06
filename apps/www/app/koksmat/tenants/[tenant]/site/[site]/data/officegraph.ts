import { https, httpsGetAll } from "@/lib/httphelper"
import { format,parseISO,add } from "date-fns"

export interface Root {
  "@odata.context": string
  value: Appointment[]
  "@odata.nextLink": string
}

export interface Appointment {
  "@odata.etag": string
  id: string
  createdDateTime: string
  lastModifiedDateTime: string
  changeKey: string
  categories: any[]
  transactionId?: string
  originalStartTimeZone: string
  originalEndTimeZone: string
  iCalUId: string
  reminderMinutesBeforeStart: number
  isReminderOn: boolean
  hasAttachments: boolean
  subject: string
  bodyPreview: string
  importance: string
  sensitivity: string
  isAllDay: boolean
  isCancelled: boolean
  isOrganizer: boolean
  responseRequested: boolean
  seriesMasterId?: string
  showAs: string
  type: string
  webLink: string
  onlineMeetingUrl?: string
  isOnlineMeeting: boolean
  onlineMeetingProvider: string
  allowNewTimeProposals: boolean
  occurrenceId?: string
  isDraft: boolean
  hideAttendees: boolean
  responseStatus: ResponseStatus
  body: Body
  start: Start
  end: End
  location: Location
  locations: Location2[]
  recurrence: any
  attendees: Attendee[]
  organizer: Organizer
  onlineMeeting: OnlineMeeting
}

export interface ResponseStatus {
  response: string
  time: string
}

export interface Body {
  contentType: string
  content: string
}

export interface Start {
  dateTime: string
  timeZone: string
}

export interface End {
  dateTime: string
  timeZone: string
}

export interface Location {
  displayName: string
  locationType: string
  uniqueId: string
  uniqueIdType: string
}

export interface Location2 {
  displayName: string
  locationType: string
  uniqueId: string
  uniqueIdType: string
}

export interface Attendee {
  type: string
  status: Status
  emailAddress: EmailAddress
}

export interface Status {
  response: string
  time: string
}

export interface EmailAddress {
  name: string
  address: string
}

export interface Organizer {
  emailAddress: EmailAddress2
}

export interface EmailAddress2 {
  name: string
  address: string
}

export interface OnlineMeeting {
  joinUrl: string
  conferenceId?: string
  tollNumber?: string
}



export async function getAppointments(accessToken: string,fromDate:Date,numberOfDays:number,maxRows:number) {
  const startDate = fromDate.toISOString().replace(".000Z","Z")
  const endDate =  add(fromDate,{days:numberOfDays}).toISOString().replace(".000Z","Z")
  
    return httpsGetAll<Appointment>(accessToken ?? "", `https://graph.microsoft.com/v1.0/me/calendarView?startDateTime=${startDate}&endDateTime=${endDate}`,{maxRows})
}


  
 