"use client"
import Link from "next/link"

import { Button } from "@/registry/new-york/ui/button"

import { roles } from "../data/roles"
import { usePathname } from "next/navigation"


interface RootLayoutProps {
  children: React.ReactNode,
  params: {  site: string } 
}

export default function RootLayout({ children,params }: RootLayoutProps) {
  const { site } = params
  const pathname = usePathname()
  return (
    <div className="container min-h-screen ">
      

      <div className="my-5 flex flex-wrap">
        
      
      </div>
      <div>{children}</div>
    </div>
  )
}
