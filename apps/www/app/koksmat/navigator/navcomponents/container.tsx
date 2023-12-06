import { useContext } from "react"

import { NavigationContext } from "../context"
import {
  NavigationItemProps,
  NavigationItemWithPositionProps,
  NavigationTraceInfo,
  NavigationTraceWarning,
} from "./elements"
import Plotter from "./plotter"
import { cn } from "@/lib/utils"

export interface ContainerProps extends NavigationItemWithPositionProps {
  containername: string
  children?: React.ReactElement | React.ReactElement[]
}

export default function Comp(props: ContainerProps) {
  const navigator = useContext(NavigationContext)
  const { containername,children } = props
  const { traceLevel } = navigator
  return (
    <div className={cn("")}>
      {traceLevel > NavigationTraceInfo && (
        <div className="text-l">
            
            {containername}</div>
      )}
      <Plotter
        typename={"Container"}
        
        tag={props.containername}
        description="A container is any receptacle or enclosure for holding a product used in storage, packaging, and transportation, including shipping"
      />
        {children}
    </div>
  )
}
