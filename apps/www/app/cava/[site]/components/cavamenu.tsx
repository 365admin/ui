"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { roles } from "../data/roles"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"



import { MdOpenInNew } from "react-icons/md"
// function roleMenuItems(site: string) {
//   {
//     return roles(site)
//     .filter((role) => role.type !== "service")
//     .sort((a, b) => a.sortOrder - b.sortOrder)
//     .map((role, key) => {
//       return (
//         <NavigationMenuItem key={key} disabled={role.version === "draft"}>  <Link href={role.link}>{role.name}</Link></NavigationMenuItem>

//       )
//     })
//   }
// }
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]



const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
export function NavigationMenuCava(props: {site:string,tenant:string}) : JSX.Element {
  const {site,tenant} = props
return (
  <div className="flex">
    <div className="grow"></div>
  <Menubar className="ml-3  border-0">
      <MenubarMenu>
  <MenubarTrigger>CAVA</MenubarTrigger>
  <MenubarContent>
    <MenubarItem>
      Open site
    </MenubarItem>
    {/* <MenubarItem>
      Change site 
    </MenubarItem> */}
    <MenubarItem disabled>New Site</MenubarItem>
    <MenubarSeparator />

    <MenubarSeparator />
  
  </MenubarContent>
</MenubarMenu>
<MenubarMenu>
      <MenubarTrigger>Rooms</MenubarTrigger>
      <MenubarContent>
        <MenubarItem disabled> New Room</MenubarItem>
        <MenubarItem>List Rooms</MenubarItem>
        <MenubarItem disabled>Delete Room</MenubarItem>
        <MenubarItem disabled>Sync Room Groups</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  <MenubarMenu>
  <MenubarTrigger>Tasks</MenubarTrigger>
  <MenubarContent>
    <MenubarItem>
      New Tab 
    </MenubarItem>
    <MenubarItem>
      New Window 
    </MenubarItem>
    <MenubarItem disabled>New Incognito Window</MenubarItem>
    <MenubarSeparator />
    <MenubarSub>
      <MenubarSubTrigger>Rooms</MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem disabled> New Room</MenubarItem>
        <MenubarItem>List Rooms</MenubarItem>
        <MenubarItem disabled>Delete Room</MenubarItem>
        <MenubarItem disabled>Sync Room Groups</MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
    <MenubarSeparator />
  
  </MenubarContent>
</MenubarMenu>

<MenubarMenu>
  <MenubarTrigger>View</MenubarTrigger>
  <MenubarContent>
  <MenubarSub>
      <MenubarSubTrigger>SharePoint</MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem >  <Link className="whitespace-nowrap" target="blank" href={`https:${tenant}.sharepoint.com/sites/${site}/lists/rooms`}>Rooms <MdOpenInNew /></Link></MenubarItem>
        <MenubarItem>List Rooms</MenubarItem>
        <MenubarItem >Delete Room</MenubarItem>
        <MenubarItem >Sync Room Groups</MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  </MenubarContent>
</MenubarMenu>
<MenubarMenu>
  <MenubarTrigger>Roles</MenubarTrigger>
  <MenubarContent>
  {/* {roleMenuItems(site)} */}
  </MenubarContent>
</MenubarMenu>
<MenubarMenu>
  <MenubarTrigger>Settings</MenubarTrigger>
  <MenubarContent>
  {/* {roleMenuItems(site)} */}
  </MenubarContent>
</MenubarMenu>
</Menubar> 
</div>
)

  
}







