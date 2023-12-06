"use client"
import { Result } from "@/lib/httphelper";
import { AccountInfo } from "@azure/msal-browser";
import { createContext } from "react";


export type SecurityContextProps = {

  roles:string[],

  account: AccountInfo | null | undefined
  getToken(scopes:string[],silentOnly:boolean):Promise<Result<string>>
  signIn():void
  signOut():void
}
export const SecurityContext = createContext<SecurityContextProps>({
  roles: [],
  account: undefined,

  signIn: function (): void {
    throw new Error("Function not implemented.");
  },
  signOut: function (): void {
    throw new Error("Function not implemented.");
  },
  getToken: function (scopes: string[], silentOnly: boolean): Promise<Result<string>> {
    throw new Error("Function not implemented.");
  }
})
