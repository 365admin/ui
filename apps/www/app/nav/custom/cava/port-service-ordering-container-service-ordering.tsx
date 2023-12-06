
  "use client"

  import { useContext } from "react"
  import { NavigationContext } from "@/navigator/context"
  import { Button } from "@/registry/new-york/ui/button"
  import { Container, Port } from "@/app/nav/components"
  import { launchPageFromSlug } from "@/app/nav/server"
  
  export default function Page() {
    const navigator = useContext(NavigationContext)
    const {  position, currentWaypoint, currentContainer } = navigator
  
    return (
      <div className="min-h-screen">
     
  
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
    )
  }
  
