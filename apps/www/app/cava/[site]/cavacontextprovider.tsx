"use client";

import { useContext, useEffect, useState } from "react";
import { CavaContext, Cava, RoleItem } from "./cavacontext";
import { MagicboxContext } from "@/app/magicbox-context";
import { getCavaOrders } from "./data";
import { Item, ItemGroup, Order } from "./data/schemas";
export interface Root {
  "@odata.context": string
  "@microsoft.graph.tips": string
  value: Roles[]
}

export interface Roles {
  "@odata.etag": string
  createdDateTime: string
  eTag: string
  id: string
  lastModifiedDateTime: string
  webUrl: string
  createdBy: CreatedBy
  lastModifiedBy: LastModifiedBy
  parentReference: ParentReference
  contentType: ContentType
  "fields@odata.context": string
  fields: Fields
}

export interface CreatedBy {
  user: User
}

export interface User {
  email: string
  id: string
  displayName: string
}

export interface LastModifiedBy {
  user: User2
}

export interface User2 {
  email: string
  id: string
  displayName: string
}

export interface ParentReference {
  id: string
  siteId: string
}

export interface ContentType {
  id: string
  name: string
}

export interface Fields {
  "@odata.etag": string
  Title: string
  UserMapping: string
  Key: string
  id: string
  ContentType: string
  Modified: string
  Created: string
  AuthorLookupId: string
  EditorLookupId: string
  _UIVersionString: string
  Attachments: boolean
  Edit: string
  LinkTitleNoMenu: string
  LinkTitle: string
  ItemChildCount: string
  FolderChildCount: string
  _ComplianceFlags: string
  _ComplianceTag: string
  _ComplianceTagWrittenTime: string
  _ComplianceTagUserId: string
  Users?: User3[]
}

export interface User3 {
  LookupId: number
  LookupValue: string
  Email: string
}





import { useSharePointList } from "@/app/sharepoint";
type Props = {
  children?: React.ReactNode;
  site: string
};

export const CavaProvider = ({ children, site }: Props) => {
  const magicbox = useContext(MagicboxContext)
  const [orders, setorders] = useState<Order[]>([])
  const [pricelistItems, setpricelistitems] = useState<Item[]>([])
  const [itemGroups, setitemGroups] = useState<ItemGroup[]>([])
  const [isloaded, setisloaded] = useState(false)
  const { items, error, isLoading } = useSharePointList(
    magicbox.session?.accessToken ?? "",
    magicbox.tenant,
    site,
    "roles"
  )
  const [roles, setroles] = useState<RoleItem[]>([])
  useEffect(() => {
    const load = async () => {

      const token: string = magicbox.session?.accessToken ?? ""
      const { orders, items, itemGroups } = await getCavaOrders(token)
      setorders(orders)
      setpricelistitems(items)
      setitemGroups(itemGroups)

    }
    if (magicbox.session?.accessToken) load()
  }, [magicbox.session?.accessToken])


  useEffect(() => {
    if (items && magicbox.session?.user) {
      const parsedItems = items.map((item: any) => {
        return item as Roles
      })
      setroles(parsedItems
        .filter((item: Roles) => {
          const users = item.fields.Users?.map((user: User3) => {
            return user.Email.toLowerCase()
          })
          return users?.includes(magicbox.session?.user?.email ?? "") ?? false
        })
        .map((item: Roles) => {
          const roleItem: RoleItem = {
            name: item.fields.Title,
            key: item.fields.Key,
            id: item.id,


          }
          return roleItem

        }))
      setisloaded(true)
    }
  }
    , [items, magicbox.session?.user])


  const hasRole =  (role: string): boolean => {
    const email = magicbox.session?.user?.email ?? ""
    if (!email) return false
    if (!isloaded) return false
    const roleItem = roles.find((roleItem) => {
      let matched = false
      matched = roleItem.key === role
      return matched
    })

    if (!roleItem) return false
    return true

  }
  const cava: Cava = {
    orders, items: pricelistItems, itemGroups, roles, isloaded, hasRole
  }


  return <CavaContext.Provider value={cava}>

    {children}
    <div className="flex"><div className="p-2">
      Roles for {magicbox.session?.user?.email}:
    </div>
      {roles.map((role: RoleItem) => { return <div key={role.id} className="mx-2 rounded-lg bg-lime-300 p-2" >{role.name} </div> })}
    </div>

  </CavaContext.Provider>;
};
