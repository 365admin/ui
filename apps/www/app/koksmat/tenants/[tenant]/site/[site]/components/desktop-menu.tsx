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
import { KoksmatContext } from "../../../../../context"
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
export function NavigationMenuKoksmat(): JSX.Element {
  const koksmat = React.useContext(KoksmatContext)
  const { site, tenant,kitchen } = koksmat
  return (
    <div className="flex">
      <div className="grow"></div>
   
      <Menubar className="ml-0  border-0">
      <MenubarMenu>
          <MenubarTrigger>Journeys</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled> New Journey</MenubarItem>
            <MenubarItem disabled={!site}>   <Link
              href={`/koksmat/tenants/${tenant}/site/${site}/journey`}>Open Journey </Link></MenubarItem>
    
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu >
          <MenubarTrigger>Sites</MenubarTrigger>
          <MenubarContent>
            
            <MenubarItem disabled={!site}>   <Link
              href={`/koksmat`}>Open Site </Link></MenubarItem>
          
            <MenubarItem disabled>New Site</MenubarItem>
            <MenubarSeparator />

            <MenubarSeparator />
            <MenubarSub>
              
              <MenubarSubTrigger>SharePoint</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem  disabled={!site}>
                  <Link className="whitespace-nowrap" target="blank" href={`https:${tenant}.sharepoint.com/sites/${site}/_layouts/15/viewlsts.aspx?view=14`}><div className="flex space-x-2"><MdOpenInNew />Contents</div> </Link>
                </MenubarItem>
                <MenubarItem disabled={!site}>
                  <Link className="whitespace-nowrap" target="blank" href={`https:${tenant}.sharepoint.com/sites/${site}/_layouts/15/settings.aspx`}><div className="flex space-x-2"><MdOpenInNew />Settings</div> </Link>
                </MenubarItem>
                <MenubarItem disabled>
                  Export site as template
                </MenubarItem>
                <MenubarItem disabled>
                  Import site from template
                </MenubarItem>
                <MenubarItem disabled>
                  Generate code from template
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Kitchens</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled> New Kitchen</MenubarItem>
            <MenubarItem disabled={!site}>   <Link
              href={`/koksmat/tenants/${tenant}/site/${site}/kitchen`}>Open Kitchen </Link></MenubarItem>
            <MenubarItem disabled>Delete Kitchen</MenubarItem>
            <MenubarItem disabled>Sync Kitchens</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Recipes</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled> New Recipe</MenubarItem>
            <MenubarItem disabled>   <Link
              href={`/koksmat/tenants/${tenant}/site/${site}/kitchen`}>Open Recipe </Link></MenubarItem>
            <MenubarItem disabled>Delete Recipes</MenubarItem>
       
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>

          <MenubarTrigger>Connections</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSub>
                <MenubarSubTrigger>Azure</MenubarSubTrigger>
                <MenubarSubContent>
                <MenubarItem disabled >
                    <Link  className="whitespace-nowrap" href={`/koksmat/azure/connect`}>Connect </Link>
                  </MenubarItem>
                  <MenubarItem >
                    <Link className="whitespace-nowrap" href={`/koksmat/azure`}>Subscriptions </Link>
                  </MenubarItem>

                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub>
                <MenubarSubTrigger>Kubernetes</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem >
                    <Link className="whitespace-nowrap" href={`/koksmat/kubernetes/clusters`}>Clusters </Link>
                  </MenubarItem>
                  <MenubarItem >
                    <Link className="whitespace-nowrap" href={`/koksmat/kubernetes/namespaces`}>Namespaces </Link>
                  </MenubarItem>
                  <MenubarItem >
                    <Link className="whitespace-nowrap" href={`/koksmat/kubernetes/pods`}>Pods </Link>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
       
                <MenubarItem >
                  <Link className="whitespace-nowrap"  href={`/koksmat/tenants/${tenant}/sharepoint`}><div className="flex space-x-2">SharePoint</div> </Link>
                </MenubarItem>
              
            </MenubarSub>


          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent>
          <MenubarItem onClick={()=>{
            koksmat.setOptions({showContext:!koksmat.options.showContext})
          }}>
             {koksmat.options.showContext?"Hide Context":"Show Context"}
            </MenubarItem>
            <MenubarItem onClick={()=>{
            koksmat.setOptions({showEcho:!koksmat.options.showEcho,showContext:koksmat.options.showContext})
          }}>
             {false && koksmat.options.showEcho?"Hide Echo":"Show Echo"}
            </MenubarItem>
            <MenubarItem onClick={()=>{
            koksmat.setOptions({showDebug:!koksmat.options.showDebug,showContext:koksmat.options.showContext})
          }}>
             {koksmat.options.showDebug?"Hide Debug":"Show Debug"}
            </MenubarItem>
            <MenubarItem >
                  <Link className="whitespace-nowrap"  href={`/koksmat/navigator`}><div className="flex space-x-2">Navigator</div> </Link>
                </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu >
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            {/* {roleMenuItems(site)} */}
            <MenubarItem >
              <Link className="whitespace-nowrap" href={`/koksmat/docs/koksmat/about`}>About </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      
    </div>
  )


}







