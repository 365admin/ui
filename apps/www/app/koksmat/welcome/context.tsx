"use client"
import { createContext } from "react";


export type WelcomeContextProps = {
 tenant:string,
 settenant:(tenant:string)=>void
}
export const WelcomeContext = createContext<WelcomeContextProps>({
  tenant: "",
  settenant: function (tenant: string): void {
    throw new Error("Function not implemented.");
  }
})
