"use client"
import { useContext } from "react"
import { NavigationItemProps, NavigationItemWithPositionProps, NavigationTraceInfo, NavigationTraceWarning } from "./elements"
import { NavigationContext } from "../context"
import Plotter from "./plotter"

export type PortType = "start" | "end" | "waypoint" 
export interface PortProps extends NavigationItemWithPositionProps{
    portType?:PortType
    portname:string
    children?:React.ReactElement | React.ReactElement[]
  
}
export default function Comp(props:PortProps){
    const navigator = useContext(NavigationContext)
    const { traceLevel } = navigator
    const {children,portname} = props
    return  <div>
        {traceLevel > NavigationTraceInfo && <div className="text-xl">
            {portname}
            </div>}
    <Plotter typename={"Port"} {...props} tag={props.portname} />
{children}
    </div>
}