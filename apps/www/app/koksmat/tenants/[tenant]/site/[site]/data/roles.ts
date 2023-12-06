
export type AccessRoleType = "role.kitchen"  
| "role.runner"
| "role.receptionist"
| "role.dispatcher"
| "role.security"
| "role.technician"
| "role.globaladmin"
| "role.admin"
| "role.admin.rooms.all"
| "role.admin.rooms"
| "role.operator"
| "role.developer"
| "role.tester"
| "orderservices"
| "booking"
| "planning"
| "organizer"
| "participant"
| "presenter"
interface Role {
  sortOrder: number;
  key: string;
  name: string;
  image: string;
  link: string;
  accessrole: AccessRoleType | AccessRoleType[];
  type: `core` | `supporting` | `service`;
  version: `draft` | `preview` | `published`;
  description?: string;
  linkname?: string;
}
export const roles = (tenant:string,site:string): Role[] => {return  [
  {
    sortOrder: 2,
    key: `build`,
    accessrole: "orderservices",
    name: `Build`,
    image: `/koksmat/brickwall-filled.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/salesorder`,
    type: `service`,
    version: `draft`,
    description: `Build new stuff, fix broken stuff and maintain existing stuff`,
    linkname: `Check tasks`,
  },
  {
    sortOrder: 4,
    key: `changemanagement`,
    accessrole: "orderservices",
    name: `Ship`,
    image: `/koksmat/containership-filled.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/salesorder`,
    type: `service`,
    version: `draft`,
    description: `Change management - You are preparing new shipments and need to know if containers are ready in time for loading`,
    linkname: `Check shipments`,
  },
  
  {
    sortOrder: 6,
    key: `navigate`,
    accessrole: `role.operator`,
    name: `Navigate`,
    image: `/koksmat/navigate.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/book`,
    type: `service`,
    version: `draft`,
    description: `Operations - You are on the command bridge and need to have information about the 
    current position and the planned route`,
    linkname: `Check map`,
  },
  {
    sortOrder: 70,
    key: `kitchen`,
    accessrole: `role.kitchen`,
    name: `Chef`,
    image: `/koksmat/chef.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/role/kitchen`,
    type: `supporting`,
    version: `draft`,
    description: `Kitchen is responsible for preparing food and drinks`,
  },
  {
    sortOrder: 87,
    key: `waiter`,
    accessrole: `role.runner`,
    name: `Decks Hand`,
    image: `/koksmat/waiter.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/role/waiter`,
    type: `supporting`,
    version: `draft`,
    description: `Runner is responsible for serving food and drinks`,
  },
  {
    sortOrder: 10,
    key: `organizer`,
    accessrole: `organizer`,
    name: `Owner`,
    image: `/koksmat/king-filled.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/role/organizer`,
    type: `core`,
    version: `draft`,
    description: `The Application Owner is accountable for the Application and be considered the King`,
  },
  {
    sortOrder: 90,
    key: `participant`,
    accessrole: `participant`,
    name: `Super Users`,
    image: `/koksmat/superwoman-filled.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/role/participant`,
    type: `core`,
    version: `draft`,
    description: `Super Users, MVP's, Champions, Power Users, Key Users, Subject Matter Experts are responsible for 
    adopting the application`,
  },
  {
    sortOrder: 91,
    key: `user`,
    accessrole: `presenter`,
    name: `Users`,
    image: `/koksmat/participants.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/role/presenter`,
    type: `core`,
    version: `draft`,
    description: `Users are the consumers of the application`,
  },
  {
    sortOrder: 75,
    key: `receptionist`,
    accessrole: `role.receptionist`,
    name: `Koksmat`,
    image: `/koksmat/receptionist.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/role/receptionist`,
    type: `supporting`,
    version: `draft`,
    description: `The Chefs hand is the most important person in the kitchen and the one with hands on, 
    implicitly responsible for wellbeing of all others`,
  },
  {
    sortOrder: 60,
    key: `test`,
    accessrole: `role.dispatcher`,
    name: `Engineers Hand`,
    image: `/koksmat/receptionist.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/role/dispatcher`,
    type: `supporting`,
    version: `preview`,
    description: `Dispatcher is responsible for ordering the services need for the meeting`,
  },
  {
    sortOrder: 99,
    key: `security`,
    accessrole: `role.security`,  
    name: `Captain`,
    image: `/koksmat/security.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/role/security`,
    type: `supporting`,
    version: `preview`,
    description: `Security is responsible for the safety of the meeting as well as ensure guests have checked out`,
  },
  {
    sortOrder: 75,
    key: `technician`,
    accessrole: `role.technician`,
    name: `Engineer`,
    image: `/koksmat/technician.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/role/technician`,
    type: `supporting`,
    version: `draft`,
    description: `Technician is responsible for the meeting infrastructure`,
  },
  {
    sortOrder: 110,
    key: `admin`,
    accessrole: ["role.admin.rooms.all","role.admin.rooms"],
    name: `Administrator`,
    image: `/koksmat/technician.svg`,
    link: `/koksmat/tenants/${tenant}/site/${site}/role/admin`,
    type: `supporting`,
    version: `preview`,
    description: `Administrator is responsible for settings and configuration of the CAVA system`,
  },
]}
