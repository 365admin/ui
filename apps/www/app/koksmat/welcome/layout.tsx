"use client"

import { useContext, useEffect } from "react"

import { ScrollArea } from "@/registry/new-york/ui/scroll-area"
import { KoksmatContext } from "@/app/koksmat/context"

import { PageContextHeader } from "../tenants/[tenant]/site/[site]/components/page-context-header"
import { WelcomeProvider } from "./contextprovider"
import { docsConfig } from "./links"
import { GitSidebarNav } from "./sidebar-nav"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const koksmat = useContext(KoksmatContext)

  const {
    tenant,
    site,
    kitchen,
    currentKitchen: cookingStation,
  } = useContext(KoksmatContext)
  useEffect(() => {
    koksmat.setOptions({ showContext: false })

    return () => {}
  }, [])

  return (
    <div className="ml-3 border-b">
      <WelcomeProvider>
        <PageContextHeader title={"Welcome"} />

        <div className="  flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
              <GitSidebarNav
                items={docsConfig(tenant).sidebarNav}
              />
            </ScrollArea>
          </aside>
          <div>{children}</div>
        </div>
      </WelcomeProvider>
    </div>
  )
}
