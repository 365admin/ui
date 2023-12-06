import { Metadata } from "next"
import Image from "next/image"
import { signIn } from "next-auth/react"

import { getUserSession } from "@/lib/user"
import { SiteFooter } from "@/components/magicbox-site-footer"
import ToSmall from "@/components/tosmall"
import { Button } from "@/registry/new-york/ui/button"
import { Separator } from "@/registry/new-york/ui/separator"

import { SidebarNav } from "./[upn]/components/sidebar-nav"
import { SiteFooter as LocalSiteFooter } from "./components/site-footer"
import { SiteHeader } from "./components/site-header"



interface SettingsLayoutProps {
  children: React.ReactNode
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  return (
    <div>
      <ToSmall />
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
       {children}
       
        <div className="container relative">
          <LocalSiteFooter />

          <SiteFooter />
        </div>
      </div>
    </div>
  )
}

