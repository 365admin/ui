"use client"

import { ReactElement, useContext, useState } from "react"

import { NavigationContext } from "@/app/koksmat/navigator/context"
import { Waypoint } from "@/app/koksmat/navigator/navcomponents/journey-schema"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react"
import Link from "next/link"
import { containerHref } from "@/app/koksmat/navigator/navcomponents/navigator"
import MermaidView from "@/app/koksmat/navigator/navcomponents/mermaid"

export default function PortDefaults(props: {
  params: { portname: string }
  waypoint?: Waypoint
  children?: ReactElement
}) {
  const navigator = useContext(NavigationContext)
  const { children ,waypoint} = props
  const { portname, } = props.params


 if (!waypoint) return null

  return (
    <div className="mt-4">
      {/* <div className="bold text-xl">Port: {portname}</div> */}
      <MermaidView waypoint={waypoint}></MermaidView>
      {/* <div>{waypoint?.loads.containers.length ?? 0} Containers to load</div> */}
      <NavigationMenu>
      <NavigationMenuList>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Icons.logo className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      koksmat
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">

              {waypoint?.loads?.containers.map((component) => (
                <ListItem
                  key={component.key}
                  title={component.name}
                  href={containerHref(navigator.rootPath, portname, component.name,"")}
                >
                  {component.who.join(", ")}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
      {/* <pre>{JSON.stringify(waypoint,null,2)}</pre> */}
      {children}
    </div>
  )
}







const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href,...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href ?? ""}>
        <span
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
        </span>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"



