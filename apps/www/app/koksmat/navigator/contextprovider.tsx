"use client"

import { useContext, useEffect, useState } from "react"

import {
  LogEntry,
  NavigationContext,
  NavigationContextProps,
  Position,
} from "./context"
import { NavigationTrace } from "./navcomponents/elements"
import { Container, Waypoint } from "./navcomponents/journey-schema"
import { PortType } from "./navcomponents/port"
import { ShippingMan } from "./lib"
import { getSlugElement } from "@/app/nav/components"

type Props = {
  children?: React.ReactNode
}

export const NavigationProvider = ({ children }: Props) => {
  const [traceLevel, setinternaltraceLevel] = useState<number>(4)
  const [row, setrow] = useState(0)
  const [whatIf, setwhatIf] = useState(false)
  const [column, setcolumn] = useState(0)
  const [waypoints, setwaypoints] = useState<Waypoint[]>([])
  const [batch, setbatch] = useState(0)
  const [version, setversion] = useState(0)
  const [cargo, setcargo] = useState(new Map<string, string>())
  const [shippingMan, setshippingMan] = useState(new ShippingMan())
  const [internalInstanceId, setInternalInstanceId] = useState("1")
  const [log, setlog] = useState<LogEntry[]>([])

  const [currentContainer, setcurrentContainer] = useState<Container>()
  const [currentWaypoint, setcurrentWaypoint] = useState<Waypoint>()
  const [position, setposition] = useState<Position>({
    journeyName: "",
    id: "",
    port: "",
    container: "",
  })
  const settraceLevel = (level: number) => {
    if (level == traceLevel) return
    setinternaltraceLevel(level)
    setversion(version + 1)
  }


  useEffect(() => {
    const setCurrentWaypoint = (port: string, waypoints: Waypoint[]) => {
      const findWaypoint = (port: string): Waypoint | undefined => {
        return waypoints.find(
          (wp) =>  getSlugElement(wp.port) === port
        )
      }
      const findContainer = (containerName: string,waypoint?:Waypoint): Container | undefined => {
        if (!waypoint) return undefined
        return waypoint.loads.containers.find((container) =>  getSlugElement(container.name) === containerName ?? undefined
        )
      }
      const wp = findWaypoint(port)
      const container = findContainer(position.container,wp)
      setcurrentWaypoint(wp)
      setcurrentContainer(container)
    }
    setCurrentWaypoint(position.port, waypoints)

  }, [position, waypoints])

  const saveBag = () => {
    localStorage.setItem("bag", JSON.stringify(Array.from(cargo.entries())))
  }

  const postlog = (tag: string, data: string) => {
    const logEntry: LogEntry = {
      tag,
      data,
      timestamp: new Date().toISOString(),
    }
    setlog([...log, logEntry])
    //setversion(version + 1)
  }
  const navigator: NavigationContextProps = {
    ship: function (tag: string, data: string): void {
      if (!tag) return
      if (!data) return
      if (cargo.has(tag)) {
        if (cargo.get(tag) === data) return
      }

      cargo.set(tag, data)
      saveBag()
      const logEntry: LogEntry = {
        tag: "bag updated",
        data: tag,
        timestamp: new Date().toISOString(),
      }
      setlog([...log, logEntry])
      console.log("bag update", tag, data)
      shippingMan.announce(tag, data)
      setversion(version + 1)
    },
    traceLevel,

    position,
    setTraceLevel: function (level: NavigationTrace): void {
      switch (level) {
        case "none":
          settraceLevel(0)
          break
        case "error":
          settraceLevel(1)
          break
        case "warning":
          settraceLevel(2)
          break
        case "info":
          settraceLevel(3)
          break
        case "verbose":
          settraceLevel(4)
          break
        case "debug":
          settraceLevel(5)
          break
        default:
          break
      }
      //
    },

    setPosition: function (position: Position): void {
      setposition(position)

      setversion(version + 1)
    },
    whatIf,
    setWhatIf: function (on: boolean): void {
      setwhatIf(on)
    },

    newBatch: function (): void {
      setbatch(batch + 1)
    },
    batch: batch,
    version,
    waypoints,
    instanceId: internalInstanceId,
    setInstanceId: function (newInstanceId: string): void {
      if (internalInstanceId === newInstanceId) return
      setInternalInstanceId(newInstanceId)
      //setversion(version + 1)
    },

    setWayPoints: function (waypoints: Waypoint[]): void {
      setwaypoints(waypoints)
    },
    currentWaypoint,
    currentContainer,
    postlog,
    log,
    shippingMan,
    cargoKeys: function (): string[] {
      return Array.from( cargo.keys())
    },
    cargo: function (key: string): string | undefined {
      return cargo.get(key)
     
    }
  }
  return (
    <NavigationContext.Provider value={navigator}>
      {children}
    </NavigationContext.Provider>
  )
}
