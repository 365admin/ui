import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/registry/new-york/ui/separator"
import { SidebarNav } from "./components/sidebar-nav"

import ToSmall from "@/components/tosmall"
import { SiteHeader } from "../components/site-header"
import { SiteFooter as LocalSiteFooter } from "../components/site-footer"
import { SiteFooter } from "@/components/magicbox-site-footer"
import { getUserSession } from "@/lib/user"
import { Button } from "@/registry/new-york/ui/button"
import { signIn } from "next-auth/react"


export const metadata: Metadata = {
  title: "Profile",
  description: "Here you can find profile informations",
}

const sidebarNavItems = (upn: string) => [
  {
    title: "Profile",
    href: `/profile/${upn}`,
  },
  // {
  //   title: "Toolbar",
  //   href: `/profile/${upn}/workplace`,
  // },
  // {
  //   title: "Appearance",
  //   href: `/profile/${upn}/appearance`,
  // },
  // {
  //   title: "Notifications",
  //   href: `/profile/${upn}/notifications`,
  // },
  {
    title: "Toolbar",
    href: `/profile/${upn}/toolbar`,
  },
]

interface SettingsLayoutProps {

  children: React.ReactNode,

}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
  const session = await getUserSession()
  if (!session) return <div className="flex-1 lg:max-w-2xl">
  You need to sign in to get access to the profile.
</div>

  return (
    <>
      <ToSmall />
      
      <div className="flex  h-screen w-screen ">
        <div className="grow " />
          <div className="container mt-4 overflow-hidden rounded-[0.5rem] border bg-background shadow">
            <div className="hidden space-y-6 p-10 pb-16 md:block">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Your profile</h2>
                <p className="text-muted-foreground">
                  Manage your news channel preferences and preferred tools.
                </p>
              </div>
              <Separator className="my-6" />

              <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                 <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems(session.user?.email??"")} />
          </aside> 
               
                
                
                
                  <div className="flex-1 lg:max-w-2xl">{children}</div>
              </div>
            </div>
            </div>
            <div className="grow" />
            </div>
     
  
 
    </>

  )
}
