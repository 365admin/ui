"use client"
import { createContext } from "react";


export type KitchenContextProps = {
  siteInstance:string
}
export const KitchenContext = createContext<KitchenContextProps>({
  siteInstance: ""
})
