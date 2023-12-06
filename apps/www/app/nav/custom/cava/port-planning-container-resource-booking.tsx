
  "use client"

  import { useContext } from "react"
  import { NavigationContext } from "@/navigator/context"
  import { Button } from "@/registry/new-york/ui/button"
  import { Container, Port } from "@/app/nav/components"
  import { launchPageFromSlug } from "@/app/nav/server"
  import { Badge } from "@/registry/new-york/ui/badge"

  export default function Page() {
    const navigator = useContext(NavigationContext)
    const {  position, currentWaypoint, currentContainer } = navigator
  
    return (
      <div className="min-h-screen">
      <Badge>Under contruction</Badge>
       
      </div>
    )
  }
  
