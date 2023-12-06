"use client"
import { useEffect, useState } from "react"

import { https, httpsGetAll } from "@/lib/httphelper"
import { z } from "zod"
import { set } from "date-fns"

export const MODULENAME = "sharepoint"

export const getAllSites = (search: string) => {
  return `https://graph.microsoft.com/v1.0/sites/?search=${search}`
}

export const getAllListURL = (tenantName: string, siteName: string) => {
  return `https://graph.microsoft.com/v1.0/sites/${tenantName}.sharepoint.com:/sites/${siteName}:/lists`
}

export const getAllItemsURL = (
  tenantName: string,
  siteName: string,
  listName: string
) => {
  return `https://graph.microsoft.com/v1.0/sites/${tenantName}.sharepoint.com:/sites/${siteName}:/lists/${decodeURIComponent(
    listName
  )}/items?$expand=fields`
}
export const getOneItemURL = (
  tenantName: string,
  siteName: string,
  listName: string,
  itemId: string
) => {
  return `https://graph.microsoft.com/v1.0/sites/${tenantName}.sharepoint.com:/sites/${siteName}:/lists/${decodeURIComponent(
    listName
  )}/items/${itemId}?$expand=fields`
}

export const version = 1

export function useSharePointList(
  token: string,
  tenantName: string,
  siteName: string,
  listName: string,

) {
  const [items, setitems] = useState<any[]>([])
  const [isLoading, setisLoading] = useState(false)
  const [error, seterror] = useState("")

  useEffect(() => {
    const load = async () => {
      setisLoading(true)
      const result = await httpsGetAll<any>(
        token,
        getAllItemsURL(tenantName, siteName, listName)
      )
      setisLoading(false)
      if (result.hasError) {
        seterror(result.errorMessage ?? "Unknown error")
        setitems([])
        return
      }
        
        setitems(result.data ?? [])
    }
    if (token && tenantName && siteName && listName ) {
      load()
    }
  }, [token, tenantName, siteName, listName])

  return {
    items,
    error,
    isLoading,
  }
}

export function useSharePointListItem<T>(
  token: string,
  tenantName: string,
  siteName: string,
  listName: string,
  itemId: string,
  map: (item: any) => any,
  schema:z.Schema
) {
  const [item, setitem] = useState<T>()
  const [itemRaw, setitemRaw] = useState<any>()
  const [isLoading, setisLoading] = useState(false)
  const [error, seterror] = useState("")

  useEffect(() => {
    const load = async () => {
      setisLoading(true)
      setitem(undefined)
      setitemRaw(undefined)

      const result = await https<T>(
        token,
        "GET",
        getOneItemURL(tenantName, siteName, listName, itemId)
      )
      setisLoading(false)
      
      if (result.hasError) {
        seterror(result.errorMessage ?? "Unknown error")
     
        return
      }
      
      if (result.data ) {
        setitemRaw(result.data)
        const mapped = schema.safeParse( map(result.data))
        
        if (mapped.success===true){
             setitem(mapped.data)
        }
        else
        {
          console.log("schema error",mapped?.error.issues)
          seterror("Cannot load data: " + mapped?.error.issues.map(i=> i.path + " " + i.message).join(","))
        }
    }}
    if (token && tenantName && siteName && listName && itemId) {
      load()
    }
  }, [token, tenantName, siteName, listName, itemId])

  return {
    item,
    error,
    isLoading,
    itemRaw
  }
}
