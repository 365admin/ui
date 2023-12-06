"use client"
import { createContext } from "react";

export type Options = {
  showDebug?: boolean,
}

export type MSALContextProps = {
  options : Options,
  setoptions:(options:Options)=>void,
  roles:string[],
  setRoles:(roles:string[])=>void
}
export const MSALContext = createContext<MSALContextProps>({
  setRoles(roles: string[]): void {
    throw new Error("Function not implemented.");
  },

  roles: [],
  options: {
    showDebug: undefined
  },
  setoptions: function (options: Options): void {
    throw new Error("Function not implemented.");
  }
})
