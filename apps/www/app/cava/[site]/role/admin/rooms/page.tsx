"use client"

import { useContext, useEffect, useMemo, useState } from "react"
import * as React from "react"

import { useToast } from "@/registry/new-york/ui/use-toast"
import { MagicboxContext } from "@/app/magicbox-context"
import { CavaContext } from "@/app/cava/[site]/cavacontext"
import { useSharePointList } from "@/app/sharepoint"
import { listName, ItemType, map,schema } from "@/app/cava/[site]/sharepoint/lists/Rooms"
import { RoomsTable } from "@/app/cava/[site]/sharepoint/lists/Rooms/table"
import { AccessRoleType } from "../../../data/roles"
import { de } from "date-fns/locale"
import { Button } from "@/registry/new-york/ui/button"
import Link from "next/link"
import { PageHeader } from "@/app/cava/[site]/components/pageheader"

export default function RoomAdminRole({ params }: { params: { site: string } }) {
  const magicbox = useContext(MagicboxContext)
  const {roles,isloaded} = useContext(CavaContext)
  const { site } = params
  const tenant = magicbox.tenant
  const [loaderror, setloaderror] = useState("")
  const { items, error, isLoading } = useSharePointList(
    magicbox.session?.accessToken ?? "",
    tenant,
    site,
    listName
  )

const createNewRoom = async () => {
  const room = {
    Title: "New Room",
    Capacity: 1,
  
    Provisioning_x0020_Status: "New",
  }
}



  const [parsedItems, setparsedItems] = useState<ItemType[]>([])
const [accessChecked, setaccessChecked] = useState(false)
const [hasaccess, sethasaccess] = useState(true)
  useEffect(() => {
  
    // => { success: false; error: ZodError }
    
    const mappedItems = items.map((item: any) => map(item)) as ItemType[]

    
    setparsedItems(mappedItems.filter((item: ItemType) => {
 
        if (item.ManagedBy.length < 1) return false
        
      return item.ManagedBy?.includes(magicbox.session?.user?.email ?? "")
    
  }))
  }, [items])
  const accessFor : AccessRoleType[] = useMemo(()=> ["role.admin.rooms","role.globaladmin","role.admin.rooms.all"],[])
  React.useEffect(() => {
   
    if ( isloaded) {
      
      const hasAccess = roles.find((role) => {
        let matched = false
        matched = accessFor.includes(role.key as AccessRoleType)
        return matched
      })
      sethasaccess(hasAccess !== undefined)
      setaccessChecked(true)
    }
  }, [roles, accessChecked, isloaded,accessFor])
  if (!accessChecked) {
    return <div>Checking access</div>
  }
  if (!hasaccess) {
    return <div><div className="mb-4 text-4xl">Access denied </div>
    <div>Role required is: {accessFor.map(role=><div key={role}>{role}</div>)} 
    </div><div className="mt-3">
    Your assigned roles are {roles.map(role=><div key={role.key}>{role.key}</div>)}</div></div>
  }
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {(error || loaderror) && <div className="text-red-700">{error}{loaderror}</div>}
      {!isLoading && !error && <div>
        <div>
        <PageHeader title="Rooms that you can manage" />
          <div className="flex">
          <div className="grow" />
            <div className="pr-2 text-xs">
              List: <Link
                target="_blank"
                href={
                  "https://" +
                  tenant +
                  ".sharepoint.com/sites/" +
                  site +
                  "/lists/" +
                  listName +
                  ""
                }
              >
               {listName}
              </Link> | Items: {items.length} | Managed by you: {parsedItems.length}
            </div>
       

          </div>
        </div>
      <RoomsTable
        items={parsedItems}
        site={site}
        listName={listName}
        roles={roles}
        viewFields={["Title", "Capacity","Email","RestrictedTo"]}
      /></div>}
    </div>
  )
}
