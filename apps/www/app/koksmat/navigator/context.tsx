"use client"

import { createContext } from "react"

import {  ContainerProps, NavigationTrace, NavigationTraceLevel, ShipProps } from "."
import { PortType } from "./navcomponents/port"
import { Waypoint,Container } from "./navcomponents/journey-schema"
import { ShippingMan } from "./lib"

export type Position = {
journeyName:string
id:string,
port:string
container:string
}

export type LogEntry = {
  timestamp: string
  tag: string
  data: string
}
export type NavigationContextProps = {
  cargoKeys: () =>  string[],
  cargo: (key:string) =>  string | undefined,
  ship: (tag: string, data: string) => void
  postlog: (tag: string, data: string) => void
  log: LogEntry[]
  position: Position
  traceLevel: number
  setTraceLevel: (level: NavigationTrace) => void
  batch:number
  version:number
  setPosition: (position: Position) => void
  setWhatIf: (on: boolean) => void
  whatIf: boolean
  newBatch: () => void
  instanceId : string
  setWayPoints: (waypoints: Waypoint[]) => void
  currentWaypoint: Waypoint | undefined 
  currentContainer: Container | undefined 
  waypoints: Waypoint[]
  shippingMan : ShippingMan
  setInstanceId: (instanceId: string) => void 
  cargoMetadata: (key:string) =>  string[] 
  rootPath:string
  setRootPath: (rootPath: string) => void
  
}
export const NavigationContext = createContext<NavigationContextProps>({
  ship: function (tag: string, data: string): void {
    throw new Error("Function not implemented.")
  },
  traceLevel: -1,

  position: {
    journeyName: "",
    id: "",
    port: "",
    container: ""
  },
  setTraceLevel: function (level: NavigationTrace): void {
    throw new Error("Function not implemented.")
  },

  setPosition: function (position: Position): void {
    throw new Error("Function not implemented.")
  },
  whatIf: false,
  setWhatIf: function (on: boolean): void {
    throw new Error("Function not implemented.")
  },

  newBatch: function (): void {
    throw new Error("Function not implemented.")
  },
  batch: 0,
  version: 0,
  instanceId: "",
  setInstanceId: function (instanceId: string): void {
    throw new Error("Function not implemented.")
  },

  setWayPoints: function (waypoints: Waypoint[]): void {
    throw new Error("Function not implemented.")
  },
  currentWaypoint: undefined,
  currentContainer: undefined,
  waypoints: [],
  postlog: function (tag: string, data: string): void {
    throw new Error("Function not implemented.")
  },
  log: [],
  shippingMan: new ShippingMan,
  cargoKeys: function (): string[] {
    throw new Error("Function not implemented.")
  },
  cargo: function (key: string): string | undefined {
    throw new Error("Function not implemented.")
  },
  cargoMetadata: function (key: string) {
    throw new Error("Function not implemented.")
  },
  rootPath: "",
  setRootPath: function (rootPath: string): void {
    throw new Error("Function not implemented.")
  }
})
