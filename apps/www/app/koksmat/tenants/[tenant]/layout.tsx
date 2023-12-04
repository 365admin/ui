"use client"

import "@/styles/globals.css"
import { useContext, useEffect } from "react"

import { NavigationProvider } from "@/app/koksmat/navigator/contextprovider"
import { SecurityContext } from "@/app/nav/context"
import { SecurityContextProvider } from "@/app/nav/contextprovider"

import { KoksmatContext } from "../../context"

interface RootLayoutProps {
  children: React.ReactNode
  params: { tenant: string }
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const { tenant } = params
  const koksmat = useContext(KoksmatContext)
  useEffect(() => {
    if (tenant) koksmat.setTenantContext(tenant)
  }, [tenant, koksmat])

  return (
    <SecurityContextProvider>
      <NavigationProvider>
        <div className="">{children}</div>
      </NavigationProvider>
    </SecurityContextProvider>
  )
}
