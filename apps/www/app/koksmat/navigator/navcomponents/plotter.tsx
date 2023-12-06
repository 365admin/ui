"use client"

import { useContext } from "react"
import { de } from "date-fns/locale"

import { NavigationContext } from "../context"
import {
  NavigationItemProps,
  NavigationTraceDebug,
  NavigationTraceError,
  NavigationTraceInfo,
  NavigationTraceNone,
  NavigationTraceVerbose,
  NavigationTraceWarning,
} from "./elements"
import { DetailsHoverCard } from "./hoovercard"

export interface PlotterProps extends NavigationItemProps {
  typename: string
  tag: string
  children?: React.ReactElement | React.ReactElement[]
  description?: string
  warning?: string
  error?: string
}

export default function Comp(props: PlotterProps) {
  const { tag, children, description, warning, error, typename } = props
  const navigator = useContext(NavigationContext)
  const { traceLevel } = navigator
  return (
    <div>
      {traceLevel > NavigationTraceNone && (
        <div className="bg-red-600 ">
          {" "}
          <div>{error}</div>
        </div>
      )}
      {traceLevel > NavigationTraceError && (
        <div className="bg-yellow-400 ">
          {" "}
          <div>{warning}</div>
        </div>
      )}

    
      {traceLevel === NavigationTraceVerbose && (
        <DetailsHoverCard
          description={description ?? ""}
          tag={typename + " details" }
        ><div/></DetailsHoverCard>
      )}
      {traceLevel === NavigationTraceDebug && (
        <DetailsHoverCard
          description={description ?? ""}
          tag={typename + " details" }
        >
          <div>{children}</div>
        </DetailsHoverCard>
      )}
    </div>
  )
}
