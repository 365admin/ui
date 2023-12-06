"use client"
import { createContext } from "react";
export type  RoomUseCases= {
  ProvisionRoom: (sharepointId: number) => void;
  DeleteRoom: (sharepointId: number) => void

}
export const UsecaseContext = createContext<RoomUseCases>({ProvisionRoom:()=>{},DeleteRoom:()=>{}});


