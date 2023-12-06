"use client"

import { useContext, useEffect, useState } from "react"

import { KoksmatContext, RoleItem } from "@/app/koksmat/context"
import { Roles, User3 } from "@/app/koksmat/contextprovider"
import { MagicboxContext } from "@/app/magicbox-context"
import { useSharePointList } from "@/app/sharepoint"

import { KitchenContext, KitchenContextProps } from "./context"

type Props = {
  children?: React.ReactNode
}

export const KitchenProvider = ({ children }: Props) => {
  const magicbox = useContext(MagicboxContext)
  const { tenant, site } = useContext(KoksmatContext)

  const [isloaded, setisloaded] = useState(false)
  const { items, error, isLoading } = useSharePointList(
    magicbox.session?.accessToken ?? "",
    tenant,
    site,
    "roles"
  )
  const [roles, setroles] = useState<RoleItem[]>([])

  useEffect(() => {
    setroles([])
    if (items && magicbox.session?.user && site) {
      setisloaded(false)
      const parsedItems = items.map((item: any) => {
        return item as Roles
      })
      setroles(
        parsedItems
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
          })
      )
      setisloaded(true)
    }
  }, [items, magicbox.session?.user, tenant, site])

  const hasRole = (role: string): boolean => {
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
  const kitchenContext: KitchenContextProps = {
    siteInstance: "",
  }

  return (
    <KitchenContext.Provider value={kitchenContext}>
      {children}
    </KitchenContext.Provider>
  )
}
