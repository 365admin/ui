"use server"

import { invokeExchangePowerShell } from "@/app/cava/server"

import { ItemType } from "."
import { getSpAuthToken, updateItem } from "@/lib/officegraph"
export interface ExchangeRoomStatus {
  CalendarProcessing: CalendarProcessing
  Room: Room
  Place: Place
}

export interface CalendarProcessing {
  AutomateProcessing: string
  AllowConflicts: boolean
  AllowDistributionGroup: boolean
  AllowMultipleResources: boolean
  BookingType: string
  BookingWindowInDays: number
  MaximumDurationInMinutes: number
  MinimumDurationInMinutes: number
  AllowRecurringMeetings: boolean
  EnforceAdjacencyAsOverlap: boolean
  EnforceCapacity: boolean
  EnforceSchedulingHorizon: boolean
  ScheduleOnlyDuringWorkHours: boolean
  ConflictPercentageAllowed: number
  MaximumConflictInstances: number
  ForwardRequestsToDelegates: boolean
  DeleteAttachments: boolean
  DeleteComments: boolean
  RemovePrivateProperty: boolean
  DeleteSubject: boolean
  AddOrganizerToSubject: boolean
  DeleteNonCalendarItems: boolean
  TentativePendingApproval: boolean
  EnableResponseDetails: boolean
  OrganizerInfo: boolean
  ResourceDelegates: any[]
  RequestOutOfPolicy: any[]
  AllRequestOutOfPolicy: boolean
  BookInPolicy: string[]
  AllBookInPolicy: boolean
  RequestInPolicy: any[]
  AllRequestInPolicy: boolean
  AddAdditionalResponse: boolean
  AdditionalResponse: any
  RemoveOldMeetingMessages: boolean
  AddNewRequestsTentatively: boolean
  ProcessExternalMeetingMessages: boolean
  RemoveForwardedMeetingNotifications: boolean
  AutoRSVPConfiguration: string
  RemoveCanceledMeetings: boolean
  EnableAutoRelease: boolean
  PostReservationMaxClaimTimeInMinutes: number
  MailboxOwnerId: string
  Identity: string
  IsValid: boolean
  ObjectState: string
}

export interface Room {
  AcceptMessagesOnlyFromWithDisplayNames: any[]
  AcceptMessagesOnlyFromSendersOrMembersWithDisplayNames: any[]
  AcceptMessagesOnlyFromDLMembersWithDisplayNames: any[]
  Database: string
  DatabaseGuid: string
  MailboxProvisioningConstraint: any
  IsMonitoringMailbox: boolean
  MailboxRegion: any
  MailboxRegionLastUpdateTime: any
  MailboxRegionSuffix: string
  MessageRecallProcessingEnabled: boolean
  MessageCopyForSentAsEnabled: boolean
  MessageCopyForSendOnBehalfEnabled: boolean
  MailboxProvisioningPreferences: any[]
  UseDatabaseRetentionDefaults: boolean
  RetainDeletedItemsUntilBackup: boolean
  DeliverToMailboxAndForward: boolean
  IsExcludedFromServingHierarchy: boolean
  IsHierarchyReady: boolean
  IsHierarchySyncEnabled: boolean
  IsPublicFolderSystemMailbox: boolean
  HasSnackyAppData: boolean
  LitigationHoldEnabled: boolean
  SingleItemRecoveryEnabled: boolean
  RetentionHoldEnabled: boolean
  EndDateForRetentionHold: any
  StartDateForRetentionHold: any
  RetentionComment: string
  RetentionUrl: string
  LitigationHoldDate: any
  LitigationHoldOwner: string
  ElcProcessingDisabled: boolean
  ComplianceTagHoldApplied: boolean
  WasInactiveMailbox: boolean
  DelayHoldApplied: boolean
  DelayReleaseHoldApplied: boolean
  PitrEnabled: boolean
  PitrCopyIntervalInSeconds: number
  PitrPaused: boolean
  PitrPausedTimestamp: any
  PitrOffboardedTimestamp: any
  InactiveMailboxRetireTime: any
  OrphanSoftDeleteTrackingTime: any
  LitigationHoldDuration: string
  ManagedFolderMailboxPolicy: any
  RetentionPolicy: string
  AddressBookPolicy: any
  CalendarRepairDisabled: boolean
  ExchangeGuid: string
  MailboxContainerGuid: any
  UnifiedMailbox: any
  MailboxLocations: string[]
  AggregatedMailboxGuids: any[]
  ExchangeSecurityDescriptor: ExchangeSecurityDescriptor
  ExchangeUserAccountControl: string
  AdminDisplayVersion: any
  MessageTrackingReadStatusEnabled: boolean
  ExternalOofOptions: string
  ForwardingAddress: any
  ForwardingSmtpAddress: any
  RetainDeletedItemsFor: string
  IsMailboxEnabled: boolean
  Languages: any[]
  OfflineAddressBook: any
  ProhibitSendQuota: string
  ProhibitSendReceiveQuota: string
  RecoverableItemsQuota: string
  RecoverableItemsWarningQuota: string
  CalendarLoggingQuota: string
  DowngradeHighPriorityMessagesEnabled: boolean
  ProtocolSettings: string[]
  RecipientLimits: string
  ImListMigrationCompleted: boolean
  SiloName: any
  IsResource: boolean
  IsLinked: boolean
  IsShared: boolean
  IsRootPublicFolderMailbox: boolean
  LinkedMasterAccount: string
  ResetPasswordOnNextLogon: boolean
  ResourceCapacity: number
  ResourceCustom: any[]
  ResourceType: string
  RoomMailboxAccountEnabled: boolean
  SamAccountName: string
  SCLDeleteThreshold: any
  SCLDeleteEnabled: any
  SCLRejectThreshold: any
  SCLRejectEnabled: any
  SCLQuarantineThreshold: any
  SCLQuarantineEnabled: any
  SCLJunkThreshold: any
  SCLJunkEnabled: any
  AntispamBypassEnabled: boolean
  ServerLegacyDN: string
  ServerName: string
  UseDatabaseQuotaDefaults: boolean
  IssueWarningQuota: string
  RulesQuota: string
  Office: string
  UserPrincipalName: string
  UMEnabled: boolean
  MaxSafeSenders: any
  MaxBlockedSenders: any
  NetID: string
  ReconciliationId: any
  WindowsLiveID: string
  MicrosoftOnlineServicesID: string
  ThrottlingPolicy: any
  RoleAssignmentPolicy: string
  DefaultPublicFolderMailbox: any
  EffectivePublicFolderMailbox: any
  SharingPolicy: string
  RemoteAccountPolicy: any
  MailboxPlan: string
  ArchiveDatabase: any
  ArchiveDatabaseGuid: string
  ArchiveGuid: string
  ArchiveName: any[]
  JournalArchiveAddress: string
  ArchiveQuota: string
  ArchiveWarningQuota: string
  ArchiveDomain: any
  ArchiveStatus: string
  ArchiveState: string
  AutoExpandingArchiveEnabled: boolean
  DisabledMailboxLocations: boolean
  RemoteRecipientType: string
  DisabledArchiveDatabase: any
  DisabledArchiveGuid: string
  QueryBaseDN: any
  QueryBaseDNRestrictionEnabled: boolean
  MailboxMoveTargetMDB: any
  MailboxMoveSourceMDB: any
  MailboxMoveFlags: string
  MailboxMoveRemoteHostName: string
  MailboxMoveBatchName: string
  MailboxMoveStatus: string
  MailboxRelease: string
  ArchiveRelease: string
  IsPersonToPersonTextMessagingEnabled: boolean
  IsMachineToPersonTextMessagingEnabled: boolean
  UserSMimeCertificate: any[]
  UserCertificate: any[]
  CalendarVersionStoreDisabled: boolean
  ImmutableId: string
  PersistedCapabilities: string[]
  SKUAssigned: any
  AuditEnabled: boolean
  AuditLogAgeLimit: string
  AuditAdmin: string[]
  AuditDelegate: string[]
  AuditOwner: string[]
  DefaultAuditSet: string[]
  WhenMailboxCreated: string
  SourceAnchor: string
  UsageLocation: any
  IsSoftDeletedByRemove: boolean
  IsSoftDeletedByDisable: boolean
  IsInactiveMailbox: boolean
  IncludeInGarbageCollection: boolean
  WhenSoftDeleted: any
  InPlaceHolds: any[]
  GeneratedOfflineAddressBooks: any[]
  AccountDisabled: boolean
  StsRefreshTokensValidFrom: string
  NonCompliantDevices: any[]
  EnforcedTimestamps: string
  DataEncryptionPolicy: any
  MessageCopyForSMTPClientSubmissionEnabled: boolean
  RecipientThrottlingThreshold: string
  SharedEmailDomainTenant: string
  SharedEmailDomainState: string
  SharedWithTargetSmtpAddress: string
  SharedEmailDomainStateLastModified: any
  EmailAddressDisplayNames: any[]
  ResourceProvisioningOptions: any[]
  Extensions: any[]
  HasPicture: boolean
  HasSpokenName: boolean
  IsDirSynced: boolean
  AcceptMessagesOnlyFrom: any[]
  AcceptMessagesOnlyFromDLMembers: any[]
  AcceptMessagesOnlyFromSendersOrMembers: any[]
  AddressListMembership: string[]
  AdministrativeUnits: any[]
  Alias: string
  ArbitrationMailbox: any
  BypassModerationFromSendersOrMembers: any[]
  OrganizationalUnit: string
  CustomAttribute1: string
  CustomAttribute10: string
  CustomAttribute11: string
  CustomAttribute12: string
  CustomAttribute13: string
  CustomAttribute14: string
  CustomAttribute15: string
  CustomAttribute2: string
  CustomAttribute3: string
  CustomAttribute4: string
  CustomAttribute5: string
  CustomAttribute6: string
  CustomAttribute7: string
  CustomAttribute8: string
  CustomAttribute9: string
  ExtensionCustomAttribute1: any[]
  ExtensionCustomAttribute2: any[]
  ExtensionCustomAttribute3: any[]
  ExtensionCustomAttribute4: any[]
  ExtensionCustomAttribute5: any[]
  DisplayName: string
  EmailAddresses: string[]
  GrantSendOnBehalfTo: any[]
  ExternalDirectoryObjectId: string
  HiddenFromAddressListsEnabled: boolean
  LastExchangeChangedTime: any
  LegacyExchangeDN: string
  MaxSendSize: string
  MaxReceiveSize: string
  ModeratedBy: any[]
  ModerationEnabled: boolean
  PoliciesIncluded: any[]
  PoliciesExcluded: string[]
  EmailAddressPolicyEnabled: boolean
  PrimarySmtpAddress: string
  RecipientType: string
  RecipientTypeDetails: string
  RejectMessagesFrom: any[]
  RejectMessagesFromDLMembers: any[]
  RejectMessagesFromSendersOrMembers: any[]
  RequireSenderAuthenticationEnabled: boolean
  SimpleDisplayName: string
  SendModerationNotifications: string
  UMDtmfMap: string[]
  WindowsEmailAddress: string
  MailTip: string
  MailTipTranslations: string[]
  Identity: string
  Id: string
  IsValid: boolean
  ExchangeVersion: string
  Name: string
  DistinguishedName: string
  ObjectCategory: string
  ObjectClass: string[]
  WhenChanged: string
  WhenCreated: string
  WhenChangedUTC: string
  WhenCreatedUTC: string
  ExchangeObjectId: string
  OrganizationalUnitRoot: string
  OrganizationId: string
  Guid: string
  OriginatingServer: string
  ObjectState: string
}

export interface ExchangeSecurityDescriptor {
  ControlFlags: ControlFlags
  Owner: string
  Group: string
  SystemAcl: any
  DiscretionaryAcl: string
  ResourceManagerControl: number
  BinaryLength: number
}

export interface ControlFlags {
  value: number
  Value: string
}

export interface Place {
  Identity: string
  DisplayName: string
  Type: string
  Street: string
  City: string
  State: string
  PostalCode: string
  CountryOrRegion: string
  GeoCoordinates: any
  IsManaged: boolean
  BookingType: string
  ResourceDelegates: any
  Phone: string
  Capacity: number
  Building: string
  ParentType: string
  CampusId: any
  BuildingId: any
  FloorId: any
  SectionId: any
  Label: any
  MTREnabled: boolean
  AudioDeviceName: string
  VideoDeviceName: string
  DisplayDeviceName: string
  IsWheelChairAccessible: boolean
  Floor: number
  FloorLabel: string
  Tags: any
  Localities: string[]
  SpaceType: any
  CustomSpaceType: any
  Desks: any
  IsValid: boolean
  ObjectState: string
}

export async function powershellUpdateWhoCanBook(restricted : boolean, roomEmail : string,listofCommaseperatedEmailAddresses : string) {
  const restrictedTo = listofCommaseperatedEmailAddresses.replaceAll(" ", "").split(",")
  const members = restrictedTo.map((m) => `"${m}"`).join(",")
  
  const powershell =
  restricted
      ? `

$mail = "${roomEmail}"
$restrictedTo =  ${members}
write-host "Processing" $mail

Set-Mailbox $mail  -MailTip "This room has restrictions on who can book it"
Set-CalendarProcessing $mail  -DeleteComments $false -AutomateProcessing AutoAccept -AllRequestInPolicy $false  -AllBookInPolicy $false -BookInPolicy $restrictedTo -BookingWindowInDays 601 -ResourceDelegates $null 
$result = $true
`
      : `

$mail = "${roomEmail}"
Set-Mailbox $mail  -MailTip ""
Set-CalendarProcessing $mail  -DeleteComments $false -AutomateProcessing AutoAccept  -AllBookInPolicy:$true -BookInPolicy $null -BookingWindowInDays 601        
$result = $true
`
  return powershell
}

export async function updateWhocanBook(accessToken:string,site: string,restricted : boolean, room: ItemType) {
  console.log("updateWhocanBook", room.RestrictedTo)
  const script = await powershellUpdateWhoCanBook(restricted, room.Email, room.RestrictedTo)

  const result = await invokeExchangePowerShell<boolean>(script)
  
   if (result.hasError){
    result.errorMessage = "Powershell error"
    return  {script,result}
   }

  const itemUpdateRequest = await updateItem(accessToken,site,"rooms",room.Id,{fields:{ RestrictedTo:restricted ? room.RestrictedTo : ""}})

  if (itemUpdateRequest.hasError){
    result.errorMessage = "Script executed, but got an error trying to update SharePoint"
    return  {script,result}
   }  





    return { script, result }
}


export async function getExchangeRoomStatus(roomEmail : string) {
  
  const script = `
  $mailbox = "${roomEmail}"
$calendarProcessing = Get-CalendarProcessing $mailbox
$room = Get-Mailbox  $mailbox
$place = Get-Place $mailbox

$result = @{
    "CalendarProcessing" = $calendarProcessing
    "Room" = $room
    "Place" = $place
}`

const result = await invokeExchangePowerShell<ExchangeRoomStatus>(script)
return { script, result }
}
