"use client"
import { createContext } from "react";
import { CookingStation, Kitchen } from "./tenants/[tenant]/site/[site]/kitchen/Kitchens";

export interface RoleItem {
  name: string
  key: string
  id: string

}

export type KoksmatOptions = {
  showContext: boolean
  showToolbar?: boolean
  showNavigation?: boolean
  showFooter?: boolean
  showMenu?: boolean
  showSidebar?: boolean
  showHeader?: boolean
  showEcho?: boolean
  showDebug?: boolean
}

export type KoksmatContextProps = {
  roles: RoleItem[]
  isloaded: boolean,
  options:KoksmatOptions
  domain:string,
  tenant:string,
  site:string,
  kitchen?:string,
  station?:string
  defaultsite?:string,
  currentKitchen?: Kitchen,
  currentstation?: CookingStation,
  showToolbar?:boolean,
  setOptions:(options:KoksmatOptions)=>void
  hasRole:  (role: string) => boolean
  setSiteContext:(tenant:string,site:string)=>void
  setTenantContext:(tenant:string)=>void
  setKitchenContext:(kitchen:string)=>void
  setStationContext:(kitchen:string,station:string)=>void
}
export const KoksmatContext = createContext<KoksmatContextProps>({
  roles: [], isloaded: false, tenant: "", site: "",
  hasRole: function (role: string): boolean {
    throw new Error("Function not implemented.");
  },
  setSiteContext: function (tenant: string, site: string): void {
    throw new Error("Function not implemented.");
  },
  setKitchenContext: function (kitchen: string): void {
    throw new Error("Function not implemented.");
  },
  setStationContext: function (kitchen: string, station: string): void {
    throw new Error("Function not implemented.");
  },
  currentKitchen: undefined,
  setTenantContext: function (tenant: string): void {
    throw new Error("Function not implemented.");
  },
  domain: "",
  options: {
    showContext: false
  },
  setOptions: function (options: KoksmatOptions): void {
    throw new Error("Function not implemented.");
  },
  defaultsite: ""
})
