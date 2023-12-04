"use client"

import { useContext, useEffect, useState } from "react"
import {
  Configuration,
  LogLevel,
  PublicClientApplication,
} from "@azure/msal-browser"
import { MsalProvider, useAccount, useMsal } from "@azure/msal-react"

import { Result, https } from "@/lib/httphelper"

import { SecurityContext, SecurityContextProps } from "./context"
import { aquireToken } from "./msal"

type Props = {
  children?: React.ReactNode
}

interface CaseProps {
  scopes: string[]
  title: string
  testurl: string
  token?: string
  
}

const configuration: Configuration = {
  cache: {
    cacheMigrationEnabled:false,
  },
  auth: {
    clientId: "c56dd27d-20a6-41de-a0f9-7c955cb5194f",
    
    authority:
      "https://login.microsoftonline.com/79dc228f-c8f2-4016-8bf0-b990b6c72e98",
    redirectUri: "/nav",
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return
        }

        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
          default:
            return
        }
      },
    },
  },
}
  const pca = new PublicClientApplication(configuration)
export const SecurityContextProvider = ({ children }: Props) => {
  const [something, setsomething] = useState("1")
  const [roles, setroles] = useState<string[]>([])
  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})
  const [latestResponse, setlatestResponse] = useState<any>()
  const [latestError, setlatestError] = useState<any>()

  useEffect(() => {
    
    if (account) {
      setroles(account.idTokenClaims?.roles ?? [])
    }
  }, [account, setroles, accounts, inProgress, instance])
  useEffect(() => {
    const aquireToken = async (thisCase?: CaseProps) => {
      setlatestError(undefined)
      setlatestResponse(undefined)
      if (account && thisCase) {
        try {
          const response = await instance.acquireTokenSilent({
            scopes: thisCase?.scopes ?? [],
            account: account,
          })
          thisCase.token = response.accessToken
          const getResponse = await https(
            response.accessToken,
            "GET",
            thisCase.testurl
          )
          setlatestResponse(getResponse)
        } catch (error) {
          try {
            const response = await instance.acquireTokenPopup({
              scopes: thisCase?.scopes ?? [],
              account: account,
            })
            thisCase.token = response.accessToken
            const getResponse = await https(
              response.accessToken,
              "GET",
              thisCase.testurl
            )
            setlatestResponse(getResponse)
          } catch (error) {
            setlatestError(error)
          }
        }
      }
    }
    aquireToken({
      scopes: ["User.Read"],
      title: "Read user profile",
      testurl: "https://graph.microsoft.com/v1.0/me",
    })
  }, [account, instance])

  const securityContext: SecurityContextProps = {
    roles,

    account,
    getToken: async function (scopes: string[],silentOnly:boolean): Promise<Result<string>> {
      if (!account) {
        return { hasError: true, errorMessage: "No account" }

      }
      const tokenResult = await aquireToken(instance, account, scopes,silentOnly)
      return tokenResult
    },
    signIn: function (): void {
      debugger
      instance.loginRedirect()
    },
    signOut: function (): void {
     instance.logoutRedirect()
    }
  }

  return (
    <MsalProvider instance={pca}>
    <SecurityContext.Provider value={securityContext}>
      {children}
    </SecurityContext.Provider>
    </MsalProvider>
  )
}
