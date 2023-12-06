export const tobedeleted = 1
// import { Result, https } from "@/lib/httphelper";




// function getCN(dn: string) {
//   return dn?.split(",OU")[0]?.split("CN=")[1]?.toLowerCase();
// }
// const buildAliasIndex = (recipients: Recipient[]): any => {
//   var index : any = {};
//   recipients.forEach((r) => {
//     index[r.a] = r;
//   });
//   return index;
// };
// const buildSmtpIndex = (recipients: Recipient[]): any => {
//   var index: any  = {};
//   recipients.forEach((r) => {
//     index[r.s] = r;
//   });
//   return index;
// };
// const buildCnIndex = (recipients: Recipient[]): any => {
//   var index : any = {};
//   recipients.forEach((r) => {
//     var s = getCN(r.dn);
//     index[s] = r;
//   });
//   return index;
// };

// const buildIndex = (recipients: Recipient[]): any => {
//   var index : any = {};
//   recipients.forEach((r) => {
//     var s = r.dn.split(",OU")[0].split("CN=")[1].toLowerCase();
//     index[s] = r;
//   });
//   return index;
// };

// const buildGuidIndex = (recipients: Recipient[]): any => {
//   var index : any = {};
//   recipients.forEach((r) => {
//     var s = r.guid;
//     index[s] = r;
//   });
//   return index;
// };
// export function indexAddressBook(): Promise<RecipientIndexes> {
//   return new Promise(async (resolve, reject) => {
//     //var buf = fs.readFileSync(exchangeRecipientsFilepath(), 'utf8')
//     var result = await https("", "GET", process.env.RECIPIENTSBLOB);
//     if (result.hasError) {
//       reject(result.errorMessage);
//       return;
//     }
//     var buf = result.data as any;
//     //var buf2 =  buf.replace(/^\uFEFF/gm, "").replace(/^\u00BB\u00BF/gm,"")
//     var exchangeRecipients: ExchangeRecipient[] = buf; //JSON.parse(buf2)
//     var recipients: Recipient[] = [];
//     var _index: any[] = [];
//     exchangeRecipients.forEach((r) => {
//       var m = convertExchangeRecipientToRecipients(r);
//       recipients.push(...m);
//       m.forEach((x) => {
//         _index.push({ s: x.primary, n: x.d, i: x.guid });
//       });
//     });

//     var indexes: RecipientIndexes = {
//       aliasIndex: buildAliasIndex(recipients),
//       cnIndex: buildCnIndex(recipients),
//       smtpIndex: buildSmtpIndex(recipients),
//       index: buildIndex(recipients),
//       guidIndex: buildGuidIndex(recipients),
//       lookup: _index,
//     };

//     resolve(indexes);
//   });
// }

// export module RecipientStructures {
//   export interface Map {
//     input: string;
//     recipient: string;
//     displayName: string;
//     smtp: string;
//   }
// }

// export interface ExchangeRecipient {
//   Guid: string;
//   Alias: string;
//   RecipientTypeDetails: string;
//   EmailAddresses: string[];
//   DisplayName: string;
//   DistinguishedName: string;
// }

// export interface Recipient {
//   s: string;
//   dn: string;
//   d: string;
//   r: string;
//   a: string;
//   primary: string;
//   guid: string;
//   proxy: any;
// }

// export const convertExchangeRecipientToRecipients = (
//   recipient: ExchangeRecipient
// ): Recipient[] => {
//   var map: Recipient[] = [];
//   var primary = "";
//   recipient.EmailAddresses.forEach((address: string) => {
//     if (address.indexOf("SMTP:") > -1) {
//       primary = address.replace("smtp:", "").replace("SMTP:", "").toLowerCase();
//     }
//   });

//   recipient.EmailAddresses.forEach((address: string) => {
//     var a = address.toLowerCase();
//     if (a.indexOf("smtp:") > -1) {
//       var r: Recipient = {
//         s: address.replace("smtp:", "").replace("SMTP:", "").toLowerCase(),
//         d: recipient.DisplayName,
//         r: recipient.RecipientTypeDetails,
//         a: recipient.Alias,
//         dn: recipient.DistinguishedName,
//         proxy: recipient.EmailAddresses,
//         guid: recipient.Guid,
//         primary,
//       };
//       map.push(r);
//     }
//   });
//   return map;
// };

// export interface RecipientIndexes {
//   aliasIndex: any;
//   cnIndex: any;
//   smtpIndex: any;
//   guidIndex: any;
//   index: any;
//   lookup: any[];
// }

// export class SearchReceipients {
//   indexes: RecipientIndexes = {
//     aliasIndex: {},
//     cnIndex: {},
//     smtpIndex: {},
//     index: {},
//     guidIndex: {},
//     lookup: [],
//   };
//   _loaded: boolean = false;
//   _loaderCalled: boolean = false;
//   _index  = [];
//   constructor() {
//     this.load();
//   }
//   load = (): Promise<boolean> => {
//     return new Promise(async (resolve, reject) => {
//       this._loaderCalled = true;
//       this.indexes = await indexAddressBook();
//       this._loaded = true;
//       resolve(true);
//     });
//   };
//   get index() {
//     return this.indexes.lookup;
//   }
//   get isLoaded() {
//     return this._loaded;
//   }
//   waitForLoad = (): Promise<boolean> => {
//     return new Promise(async (resolve, reject) => {
//       var loops = 0;
//       while (!this.isLoaded) {
//         await new Promise((r) => setTimeout(r, 100))

//         loops++;
//         if (loops > 300) {
//           // 30 secs approxs
//           reject("Timeout waiting for Recipient index to initialize");

//           return;
//         }
//       }

//       resolve(true);
//     });
//   };

//   byUPN = (upn: string): Promise<string> => {
//     return new Promise(async (resolve, reject) => {
//       await this.waitForLoad();
//       var key = upn.toLowerCase();
//       var recipient = this.lookupSmtp(key);

//       resolve(recipient.guid);
//     });
//   };
//   lookupAlias = (alias:string) => this.indexes.aliasIndex[alias];
//   lookupSmtp = (smtp:string): Recipient => {
//     return this.indexes.smtpIndex[smtp];
//   };
//   lookupCn = (cn:string) => this.indexes.cnIndex[cn];
//   lookupGuid = (cn:string) => this.indexes.guidIndex[cn];
//   lookup = (cn:string) => this.indexes.index[cn];

//   match = (addresses: string[]): RecipientStructures.Map[] => {
//     var map: RecipientStructures.Map[] = addresses.map((address) => {
//       var a = address.toLowerCase();
//       var m: RecipientStructures.Map = {
//         input: address,
//         recipient: "",
//         displayName: "",
//         smtp: "",
//       };
//       let recipient;
//       recipient = this.lookupAlias(a);
//       if (!recipient) recipient = this.lookupCn(a);
//       if (!recipient) recipient = this.lookupSmtp(a);
//       if (!recipient) recipient = this.lookup(a);
//       if (!recipient) recipient = this.lookupGuid(a);
//       if (recipient) {
//         m.recipient = recipient.guid;
//         m.displayName = recipient.d;
//         m.smtp = recipient.primary;
//       }
//       return m;
//     });
//     return map;
//   };
// }
// var search = new SearchReceipients();

// export function createMailContact(
//   requestorUpn: string,
//   contact: string
// ): Promise<APIResponse> {
//   return execute(
//     requestorUpn,
//     "Create Mail Contact",
//     scripts.createMailContact(contact)
//   );
// }

// export const getIndex = (): Promise<APIResponse> => {
//   return new Promise(async (resolve, reject) => {
//     await search.waitForLoad();
//     resolve({ code: 200, data: search.index });
//   });
// };

// export function publishGroupFinderIndex(
//   segments: MailSegments.Parsed
// ): Promise<Result<MailSegments.Parsed>> {
//   return new Promise(async (resolve, reject) => {
//     var groupFinderIndex: MailSegments.Parsed = {
//       sheets: [],
//       columns: [],
//       results: {
//         onSheetLoaded: {
//           version: segments.results.onSheetLoaded.version,
//           columns: [...segments.results.onSheetLoaded.columns],
//           segments: segments.results.onSheetLoaded.segments.map((segment) => {
//             var newSegment: MailSegments.Segment = {
//               name: segment.name,
//               tag: segment.tag,
//               values: segment.values.map((value) => {
//                 let newValue: MailSegments.Value = {
//                   key: value.key,
//                   keyHash: value.keyHash,
//                   values: [],
//                 };
//                 return newValue;
//               }),
//             };
//             return newSegment;
//           }),
//         },
//       },
//     };

  
//     resolve({hasError:false,data:groupFinderIndex});
//   });
// }

// export module scripts {
//     export const ownedBy =  (upn:string) => `Get-DistributionGroup -ManagedBy ${upn} | select PrimarySmtpAddress,RecipientTypeDetails,DisplayName,IsDirSynced | ConvertTo-JSON`
//     export const addMailGroup =  (upn:string,name:string,displayName:string) => `New-DistributionGroup -Name "${name}" -DisplayName "${displayName}" -ManagedBy ${upn} | ConvertTo-JSON`
//     export const deleteMailGroup =  (upn:string) => `Remove-DistributionGroup ${upn}  -Confirm:$false | ConvertTo-JSON`
//     export const deleteMailGroupMember =  (upn:string,member:string) => `Remove-DistributionGroupMember -Identity ${upn} -Member ${member} -Confirm:$false  | ConvertTo-JSON`
//     export const addMailGroupMember =  (upn:string,member:string) => `Add-DistributionGroupMember -Identity ${upn} -Member ${member} -Confirm:$false  | ConvertTo-JSON`
//     export const getMailGroup =  (upn:string) => `Get-DistributionGroup ${upn} | ConvertTo-JSON`
//     export const getMailGroups =  (filter:string) => `Get-DistributionGroup -ResultSize 200  -filter "${filter}" | select Alias,GroupType,PrimarySmtpAddress,DisplayName,RecipientTypeDetails,IsDirSynced | ConvertTo-JSON`
//     export const getMailGroupMembers =  (upn:string) => `Get-DistributionGroupMember ${upn} -ResultSize Unlimited | select Guid | ConvertTo-JSON`
//     export const downloadRecipients  =  (filePath : string) => `Get-Recipient -ResultSize Unlimited  | select Id,Guid,Alias,RecipientTypeDetails,EmailAddresses,DisplayName,DistinguishedName | convertto-json  | Out-File -Encoding utf8 "${filePath}"`
//     export const downloadDistributionGroups  =  (filePath : string) => `Get-DistributionGroup -ResultSize unlimited | select Id,Guid,ManagedBy,GroupType,SamAccountName,Description,Alias,DisplayName,EmailAddresses,HiddenFromAddressListsEnabled,PrimarySmtpAddress,RecipientType,RecipientTypeDetails,MailTip,MailTipTranslations,Name,DistinguishedName | convertto-json |  Out-File -Encoding utf8 "${filePath}"`
//     export const updateMailGroupMembers =  (upn:string,members : string[]) => ` Update-DistributionGroupMember  -Identity ${upn} -Members ${members.map(m=>`"${m}"`).join(",")}   -Confirm:$false ` 
//     export const updateMailGroupOwners =  (upn:string,owners : string[]) => ` Set-DistributionGroup  -Identity ${upn} -ManagedBy ${owners.map(m=>`"${m}"`).join(",")}   -Confirm:$false ` 
//     export const createMailContact =  (smtp : string) => `New-MailContact -ExternalEmailAddress ${smtp}  -Name ${smtp} | ConvertTo-JSON`
//     export const getServerLastReboot = () =>  `Get-CimInstance -ClassName win32_operatingsystem | select csname, lastbootuptime | ConvertTo-JSON`
    
//     }
    
    
//     export const parseExpresion = (body : any, script:string) : string => {
//         return eval(script)
//     }
    
//     export const buildInstruction = ($ : any, script:string) : string => {
//         return eval(script)
//     }
// var searchReceipients = new SearchReceipients()
// searchReceipients.load()

// export module MailSegments {

//     export interface Value {
//         key: string;
//         keyHash:string,
//         values: string[];
//     }

//     export interface Segment {
//         name: string;
//         tag:string;

//         values: Value[];
//     }

//     export interface OnSheetLoaded {
//         version: string;
//         columns: string[];
//         segments: Segment[];
//     }

//     export interface Results {
//         onSheetLoaded: OnSheetLoaded;
//     }

//     export interface Parsed {
//         sheets: string[];
//         columns: string[];
//         results: Results;
//     }

// }

// export const getGroups = (accessToken: string,filter:string): Promise<any> => {
//     return new Promise(async (resolve, reject) => {
//         var url = `https://graph.microsoft.com/v1.0/groups?$filter=${filter}`
//         console.log(url)
//         var result: Result<any> = await https(accessToken, "GET", url)
//         if (result.hasError) {
//             return resolve(null)
//         }
//         resolve(result.data)
//     })

// export module Groups {

//     export interface GroupIndexes {
//         owners: Map<string, Group[]>
//         displayNameAndEmail: any
//     }

//     export interface Group {

//     }
//     export interface ExchangeGroup {
//         Id: string;
//         Guid: string;
//         ManagedBy: string[];
//         GroupType: string;
//         SamAccountName: string;
//         Description: any[];
//         Alias: string;
//         DisplayName: string;
//         EmailAddresses: string[];
//         HiddenFromAddressListsEnabled: boolean;
//         PrimarySmtpAddress: string;
//         RecipientType: string;
//         RecipientTypeDetails: string;
//         MailTip?: any;
//         MailTipTranslations: any[];
//         Name: string;
//         DistinguishedName: string;
//     }

// }
// export function indexGroups(): Promise<Groups.GroupIndexes> {
//     return new Promise(async (resolve, reject) => {
//         var search = new SearchReceipients()
//         search.load()
//         const lookup = (cn: string): Promise<string> => {
//             return new Promise(async (resolve, reject) => {
//                 while (!search.isLoaded) {
//                     await setTimeout(100)
//                 }
//                 var result = search.match([cn])

//                 resolve(result[0].recipient)
//             })
//         }

//         var result = await https("", "GET", process.env.GROUPSBLOB);
//         if (result.hasError) {
//             reject(result.errorMessage);
//             return;
//         }
//         var buf = result.data as any;

//         var exchangeGroups: Groups.ExchangeGroup[] = buf; //JSON.parse(buf2)
//         var owners = await extractGroupOwners(exchangeGroups, lookup)
//         var displayNameAndEmail = exchangeGroups.map((group) => {
//             var mail = ""
//             group.EmailAddresses.forEach(m => {
//                 if (m.indexOf("SMTP:") > -1) {
//                     mail = m.replace("SMTP:", "")
//                 }
//             })
//             return { name: group.DisplayName, mail, alias:group.Alias,guid:group.Guid }
//         })

//         var indexes: Groups.GroupIndexes = {
//             owners,
//             displayNameAndEmail
//         };


//         resolve(indexes);
//     });

// }


// interface ResolverFunc {
//     (address: string): Promise<string>
// }
// export function extractGroupOwners(groups: Groups.ExchangeGroup[], resolveCN: ResolverFunc): Promise<Map<string, Groups.Group[]>> {
//     return new Promise(async (resolve, reject) => {
//         var map = new Map<string, Groups.Group[]>()
//         var pending = 0
//         groups.forEach(group => {
//             group.ManagedBy.forEach(async (address: string) => {
//                 pending++
//                 var upn = await resolveCN(address)
//                 pending--
//                 if (upn) {
//                     if (map && upn && map.has(upn)) {
//                         map.get(upn)?.push(group)
//                     } else {
//                         map.set(upn, [group])
//                     }
//                 }
//                 if (pending === 0) {
//                     resolve(map)

//                 }
//             })
//         });
//     })
// }

// export class SearchGroups {
//     indexes: Groups.GroupIndexes = {
//         owners: undefined,
//         displayNameAndEmail: undefined
//     }
//     _loaded: boolean = false
//     _loaderCalled: boolean = false

//     constructor() {
//         this.load()
//     }
//     load = (): Promise<boolean> => {
//         return new Promise(async (resolve, reject) => {
//             this._loaderCalled = true
//             this.indexes = await indexGroups()
//             this._loaded = true
//             console.log("Loaded Groups Indexes")
//             resolve(true)
//         })

//     }

//     get isLoaded() { return this._loaded }
//     waitForLoad = (): Promise<boolean> => {
//         return new Promise(async (resolve, reject) => {
//             var loops = 0
//             while (!this.isLoaded) {
//                 await setTimeout(100)
//                 loops++
//                 if (loops > 300) { // 30 secs approxs
//                     reject("Timeout waiting for Group index to initialize")

//                     return
//                 }
//             }

//             resolve(true)

//         })
//     }
//     lookupOwner = (guid: string): Promise<Groups.Group[]> => {
//         return new Promise(async (resolve, reject) => {
//             if (!this._loaderCalled) {
//                 reject("Loader has not been called")
//                 return
//             }
//             var loops = 0
//             while (!this.isLoaded) {
//                 await setTimeout(100)
//                 loops++
//                 if (loops > 300) { // 30 secs approxs
//                     reject("Timeout waiting for Group index to initialize")
//                     return
//                 }
//             }
//             resolve(this.indexes.owners.get(guid))
//         })
//     }



// }

// var search = new SearchGroups()


// export function addMailGroup(requestorUpn: string, name: string,displayName?:string): Promise<APIResponse> {

//     return execute(requestorUpn, "Add Mail Group" + requestorUpn, scripts.addMailGroup(requestorUpn, name,displayName?displayName:name))
// }

// export function deleteMailGroup(requestorUpn: string, upn: string): Promise<APIResponse> {
//     return execute(requestorUpn, "Delete Mail Group" + upn, scripts.deleteMailGroup(upn))
// }

// export function deleteMailGroupMember(requestorUpn: string, upn: string, member: string): Promise<APIResponse> {
//     cache.delete(`mailgroupmembers-${upn}`)
//     return execute(requestorUpn, "Delete Mail Group member" + upn, scripts.deleteMailGroupMember(upn,member))
// }

// export function addMailGroupMember(requestorUpn: string, upn: string, member: string): Promise<APIResponse> {
//     cache.delete(`mailgroupmembers-${upn}`)
//     return execute(requestorUpn, "Add Mail Group member" + upn, scripts.addMailGroupMember(upn,member))
// }


// function executeCache(requestorUpn: string, key: string,  script: string, ttl: number = 600000): Promise<APIResponse> {
//     return new Promise(async (resolve, reject) => {
//         var data = await cache.get(key)
//         if (data) {
//             resolve(data)
//             return
//         }

//         var result = await execute(requestorUpn, key, script)
//         if (result.code === 200){
//             cache.set(key, result, ttl)
//         }
//         resolve(result)

//     })


// }

// export function getMailGroup(requestorUpn: string, upn: string): Promise<APIResponse> {
//     return executeCache(requestorUpn, `mailgroup-${upn}`, scripts.getMailGroup(upn))
// }


// export function getMailGroupMembers(requestorUpn: string, upn: string): Promise<APIResponse> {
//     function parseObjectOrArray(text:string) : string[]{

//         if (!text) return []
        
//             var data = JSON.parse(text)
//             if (data.length) {
//                 return data.map(m => m.Guid)
//             }else{
//                 return [data.Guid]
//             }
        
//     }
    
//     return new Promise(async (resolve, reject) => {

//         var members = await executeCache(requestorUpn, `mailgroupmembers-${upn}`, scripts.getMailGroupMembers(upn))
        
//         resolve({ code: members.code,  data: members.code !== 200? null: parseObjectOrArray(members.data)})
//     })

// }

// export function getMailGroups(requestorUpn: string, upn: string): Promise<APIResponse> {

//     // return new Promise(async (resolve, reject) => { 

//     //     search.lookupOwner(upn).then(groups=>{
//     //         resolve({code:200,data:groups})
//     //     })
//     //     .catch(error=>resolve({code:500,data:error}))

//     //  })
//     return executeCache(requestorUpn, `ownedmailgroups-${upn}`, scripts.ownedBy(upn))
// }


// // export const getObjects = (upn: string) :Promise<any> => {
// //     return new Promise((resolve, reject) => { 

// //         //var token = await getToken()
// //         var objects = https(token,"GET",`https://graph.microsoft.com/v1.0/users/${upn}/ownedObjects`)

// //      })


// // }
// export function getMailGroupsV2(requestorUpn: string, upn: string): Promise<APIResponse> {

//     return new Promise(async (resolve, reject) => {
//         var objects = [] //await getObjects(upn)        
//         var recipient = await searchReceipients.byUPN(upn)
//         if (!recipient) {
//             resolve({ code: 404, data: upn + " not found" })
//             return
//         }
//         search.lookupOwner(recipient).then(exchange => {
//             resolve({ code: 200, data: { exchange, objects } })
//         })
//             .catch(error => resolve({ code: 500, data: error }))

//     })

// }

// export function getAllMailGroups(requestorUpn: string, filter: string): Promise<APIResponse> {
//     return executeCache(requestorUpn, `filteredmailgroup-${filter}`, scripts.getMailGroups(filter))
// }

// export function updateMailGroupMembers(requestorUpn: string, upn: string, members: string[],batch:string): Promise<APIResponse> {
//     var m = new Map<string, string>()
//     var uniqueIds: string[] = []
//     members.forEach(member => {
//         if (!m.has(member)) {
//             m.set(member, member)
//             uniqueIds.push(member)
//         }
//     })

//     return execute(requestorUpn, "Update members of Mail Groups", scripts.updateMailGroupMembers(upn, uniqueIds), true,batch,true)

// }
// export function updateMailGroupOwners(requestorUpn: string, upn: string, members: string[],batch:string): Promise<APIResponse> {
//     var m = new Map<string, string>()
//     var uniqueIds: string[] = []
//     members.forEach(member => {
//         if (!m.has(member)) {
//             m.set(member, member)
//             uniqueIds.push(member)
//         }
//     })

//     return execute(requestorUpn, "Update owners of Mail Groups", scripts.updateMailGroupOwners(upn, uniqueIds), false,batch,true)

// }

// export const getIndex = (): Promise<APIResponse> => {
//     return new Promise(async (resolve, reject) => {
//         await search.waitForLoad()


//         var data = search.indexes.displayNameAndEmail
//         resolve({ code: 200, data })
//     })

// }
