"use client"

import { useContext, useEffect, useState } from "react"
import { JourneyView } from "@/navigator/navcomponents/journey"
import { z } from "zod"

import { NavItem, SidebarNavItem } from "@/types/nav"
import { JourneyProps, PortMap, SeaView } from "@/app/koksmat/navigator"
import { SeaViewForm } from "@/app/koksmat/navigator/ui-components/items/form"
import { PageContextHeader } from "@/app/koksmat/tenants/[tenant]/site/[site]/components/page-context-header"

import { NavigationContext } from "../context"
import { Waypoint,Root } from "./journey-schema"
import RightbarNav from "./rightbar-nav"
import MermaidView from "./mermaid"
import { getSlugElement } from "@/app/nav/components"

export function containerHref(rootPath: string, port: string, container: string,id:string) {
  return rootPath + "/port/" + getSlugElement(port) + "/container/" +getSlugElement( container )+ "?id="+id
}

export function portHref(rootPath: string, port: string,id:string) {
  return rootPath + "/port/" + getSlugElement(port) + "?id="+id
}

function getRightBarNavItems(
  rootPath: string,
  waypoints: Waypoint[],
  port: string,
  journey: string,
  id: string
): NavItem[] {
  const wp = waypoints.find((wp) => getSlugElement( wp.port) === port)
  if (!wp) return []

  return wp?.loads?.containers.map((container) => {
    return {
      title: container?.name,
      href: containerHref(rootPath, port, container.name,id),
      //label: "xxx",
      items: [],
    }
  })
}
function getLeftBarNavItems(
  rootPath: string,
  waypoint: Waypoint[],
  journey: string,
  id: string
): NavItem[] {
  return waypoint.map((waypoint) => {
    return {
      title: waypoint.port,
      href: portHref(rootPath, waypoint.port,id),
      //label: "xxx",
      items: [],
    }
  })
}
export default function Navigator(props: {
  rootPath: string
  children: React.ReactNode
  params: { journey: string; slug: string[] }
  travelplan: JourneyProps
}) {
  const { rootPath } = props
  const navigator = useContext(NavigationContext)
  useEffect(() => {
    navigator.setRootPath(rootPath)
  
  
  }, [navigator, rootPath])
  
  const { travelplan } = props
  const { journey, slug } = props.params
  const { id } = navigator.position


  return (
    <div className="flex">
      <div className="sticky top-[64px] mt-4 w-[200px] border-r pr-2">
        {/* <div>{travelplan.metadata.name}</div> */}
        <PortMap
          currentPath={rootPath + "/port/" + navigator.position.port}
          items={getLeftBarNavItems(
            rootPath,
            travelplan.waypoints,
            journey,
            id
          )}
        />
      </div>
      <div className=" flex grow">
        <div className="grow">
         
          <JourneyView
            travelplan={travelplan}
            id={""}
            journey={journey}
            slug={slug}
          >
            <div>{props.children}</div>
          </JourneyView>
          <div>Log entries</div>
          <div className="mono">
          {navigator.log.map((entry, ix) => {
            return (
              <div key={ix} className="flex space-x-2">
                <div>{entry.timestamp}</div>
                <div>{entry.tag}</div>
                <div>{entry.data}</div>
              </div>
            )
          })}
        </div></div>
      </div>
       <div className="ml-4 mt-4 w-[200px] border-l">
        <RightbarNav
          items={getRightBarNavItems(
            rootPath,
            travelplan.waypoints,
            navigator.position.port,
            journey,
            id
          )}
        />
      </div> 
    </div>
  )
}
