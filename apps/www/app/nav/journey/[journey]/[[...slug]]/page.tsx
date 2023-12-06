"use client"

import { use, useContext, useEffect, useState } from "react"
import { NavigationContext } from "@/navigator/context"

import { Button } from "@/registry/new-york/ui/button"
import { Container, Port } from "@/app/nav/components"
import { createPageFromSlug } from "@/app/nav/server"
import custom from "@/app/nav/custom"

export default function Page(props: { params: { journey:string,slug: string[] } }) {
  const { slug,journey } = props.params
  const navigator = useContext(NavigationContext)

  const { cargo: bag, position, currentWaypoint, currentContainer } = navigator
const [customcomponent, setcustomcomponent] = useState<any>()
  useEffect(() => {
    const customcomponent = custom(journey,(slug ?? []).join("/"))
    setcustomcomponent(customcomponent)
 
  }, [journey, slug])
  
  return (
    <div>
    <div className="min-h-screen">

  
      {customcomponent && customcomponent

      }
      <Port waypoint={currentWaypoint} params={{ portname: position.port }}>
        <div></div>
      </Port>
      <Container
        waypoint={currentWaypoint}
        container={currentContainer}
        params={{
          portname: position.port,
          containername: position.container,
        }}
      />
    </div>
        {!customcomponent && slug && <Button
          onClick={async () => {
            
            createPageFromSlug(journey,slug.join("/"))
          }}
        >
          Customize
        </Button>}
        </div>
  )
}
