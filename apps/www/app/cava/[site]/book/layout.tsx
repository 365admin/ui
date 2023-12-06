"use client"
import Link from "next/link"

import { Button } from "@/registry/new-york/ui/button"

import { roles } from "../data/roles"
import { usePathname } from "next/navigation"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname()
  return (
    <div className="container min-h-screen ">
      {/* <div className="my-5 flex flex-wrap">
        
        {roles
        .filter((role) => role.type !== "service")
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((role,key) => {
            return (
              <Button className="mr-5" key={key} variant={ pathname === role.link ? "default" : "outline"} disabled={role.version === "draft"}>
                <Link href={role.link}>{role.name}</Link>
              </Button>
            )
          })}
      </div> */}
      <div>{children}</div>
    </div>
  )
}
