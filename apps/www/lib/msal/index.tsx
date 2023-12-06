"use client"

import React, { use, useContext, useEffect, useState } from "react"
import { useAccount, useMsal } from "@azure/msal-react"
import { Method } from "axios"

import { Result, https } from "@/lib/httphelper"
import { Button } from "@/registry/new-york/ui/button"

import { MSALContext } from "./context"

interface CaseProps {
  scopes: string[]
  title: string
  endpoint: string
  method: Method
  token?: string
  body?: string
}
export const sampleCases: CaseProps[] = [
  {
    scopes: ["User.Read"],
    title: "Read user profile",
    endpoint: "https://graph.microsoft.com/v1.0/me",
    method: "GET",
  },
  {
    scopes: ["Mail.ReadBasic"],
    title: "Read mails",
    endpoint: "https://graph.microsoft.com/v1.0/me/messages",
    method: "GET",
  },
  {
    scopes: ["User.Read", "Group.Read.All"],
    title: "Get memberships",
    endpoint: "https://graph.microsoft.com/v1.0/me/memberOf?$count=true",
    method: "GET",
  },
]
export function Login() {
  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})
  return (
    <Button
      disabled={accounts.length > 0}
      onClick={() => {
        instance.loginRedirect()
      }}
    >
      Login
    </Button>
  )
}
export function Logout() {
  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})
  return (
    <Button
      disabled={accounts.length < 1}
      variant={"destructive"}
      onClick={() => {
        instance.logout()
      }}
    >
      Logout
    </Button>
  )
}
export function Execute<T>({
  thisCase,
  onExecuted

}: {
  thisCase: CaseProps
  onExecuted: (response: Result<T>) => void
 
}) {
  const msalContext = useContext(MSALContext)
  const [ran, setran] = useState(false)
  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})
  const [latestError, setlatestError] = useState<any>()
  const [latestResponse, setlatestResponse] = useState<any>()
  

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
            thisCase.method,
            thisCase.endpoint,
            thisCase.body
          )
          setlatestResponse(getResponse)
        } catch (error) {
          try {
            const response = await instance.acquireTokenPopup({
              scopes: thisCase.scopes ?? [],
              account: account,
            })
            thisCase.token = response.accessToken
            const getResponse = await https<T>(
              response.accessToken,
              thisCase.method,
              thisCase.endpoint,
              thisCase.body
            )
            onExecuted(getResponse)
            setlatestResponse(getResponse)
          } catch (error) {
            setlatestError(error)
          }
        }
      }
    }
    if (account && thisCase && !ran) {
      setran(true)
      aquireToken(thisCase)
    }
  }, [account, thisCase, ran, instance, onExecuted])
  
  return <div>
    {msalContext.options.showDebug && <div>
      <h3>Latest response</h3>
      <pre>{JSON.stringify(latestResponse, null, 2)}</pre>{" "}
      <h3>Latest error</h3>
      <pre>{JSON.stringify(latestError, null, 2)}</pre>{" "}
    </div>}

  </div>
}
