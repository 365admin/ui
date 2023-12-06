
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
export const roles = (site:string): Role[] => {return  [
  {
    sortOrder: 2,
    key: `bookplaces`,
    accessrole: `booking`,
    name: `Book Places`,
    image: `/cava/inroom.svg`,
    link: `/cava/${site}/book`,
    type: `service`,
    version: `preview`,
    description: `This is where you find places to meet, physically or virtually`,
    linkname: `Start Booking`,
  },
  {
    sortOrder: 4,
    key: `orderservices`,
    accessrole: "orderservices",
    name: `Order Services`,
    image: `/cava/cava-dark.svg`,
    link: `/cava/${site}/salesorder`,
    type: `service`,
    version: `preview`,
    description: `Order services for your meeting`,
    linkname: `Order Services`,
  },
  {
    sortOrder: 70,
    key: `kitchen`,
    accessrole: `role.kitchen`,
    name: `Kitchen`,
    image: `/cava/chef.svg`,
    link: `/cava/${site}/role/kitchen`,
    type: `supporting`,
    version: `preview`,
    description: `Kitchen is responsible for preparing food and drinks`,
  },
  {
    sortOrder: 80,
    key: `waiter`,
    accessrole: `role.runner`,
    name: `Runner`,
    image: `/cava/waiter.svg`,
    link: `/cava/${site}/role/waiter`,
    type: `supporting`,
    version: `draft`,
    description: `Runner is responsible for serving food and drinks`,
  },
  {
    sortOrder: 10,
    key: `organizer`,
    accessrole: `organizer`,
    name: `Organizer`,
    image: `/cava/organizer.svg`,
    link: `/cava/${site}/role/organizer`,
    type: `core`,
    version: `preview`,
    description: `Organizer is responsible for planning and managing the meeting`,
  },
  {
    sortOrder: 90,
    key: `participant`,
    accessrole: `participant`,
    name: `Participant`,
    image: `/cava/participants.svg`,
    link: `/cava/${site}/role/participant`,
    type: `core`,
    version: `draft`,
    description: `Participant is attending the meeting, either in person or remotely`,
  },
  {
    sortOrder: 91,
    key: `presenter`,
    accessrole: `presenter`,
    name: `Presenter`,
    image: `/cava/presenter.svg`,
    link: `/cava/${site}/role/presenter`,
    type: `core`,
    version: `draft`,
    description: `Presenter is responsible for presenting content to the meeting, either in person or remotely`,
  },
  {
    sortOrder: 85,
    key: `receptionist`,
    accessrole: `role.receptionist`,
    name: `Receptionist`,
    image: `/cava/receptionist.svg`,
    link: `/cava/${site}/role/receptionist`,
    type: `supporting`,
    version: `draft`,
    description: `Receptionist is responsible for welcoming guests and checking them in`,
  },
  {
    sortOrder: 60,
    key: `dispatcher`,
    accessrole: `role.dispatcher`,
    name: `Dispatcher`,
    image: `/cava/receptionist.svg`,
    link: `/cava/${site}/role/dispatcher`,
    type: `supporting`,
    version: `preview`,
    description: `Dispatcher is responsible for ordering the services need for the meeting`,
  },
  {
    sortOrder: 99,
    key: `security`,
    accessrole: `role.security`,  
    name: `Security`,
    image: `/cava/security.svg`,
    link: `/cava/${site}/role/security`,
    type: `supporting`,
    version: `preview`,
    description: `Security is responsible for the safety of the meeting as well as ensure guests have checked out`,
  },
  {
    sortOrder: 75,
    key: `technician`,
    accessrole: `role.technician`,
    name: `Technician`,
    image: `/cava/technician.svg`,
    link: `/cava/${site}/role/technician`,
    type: `supporting`,
    version: `draft`,
    description: `Technician is responsible for the meeting infrastructure`,
  },
  {
    sortOrder: 110,
    key: `admin`,
    accessrole: ["role.admin.rooms.all","role.admin.rooms"],
    name: `Administrator`,
    image: `/cava/technician.svg`,
    link: `/cava/${site}/role/admin`,
    type: `supporting`,
    version: `preview`,
    description: `Administrator is responsible for settings and configuration of the CAVA system`,
  },
]}
