"use client"
import { createContext } from "react";
import { Workspace } from "./[tenant]/[site]/kitchen";

export interface RoleItem {
  name: string
  key: string
  id: string

}

export type KoksmatContextProps = {
  roles: RoleItem[]
  isloaded: boolean,
  tenant:string,
  site:string,
  kitchen?:string,
  station?:string
  workspace?: Workspace,
  showToolbar?:boolean,
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
  workspace: undefined,
  setTenantContext: function (tenant: string): void {
    throw new Error("Function not implemented.");
  }
})
