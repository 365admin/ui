"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function WorkspaceNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
       <Link href="/" className="mr-6 flex items-center space-x-2">
  
        <span className="hidden font-bold sm:inline-block">
          workspace
        </span>
      </Link> 
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/koksmat/docs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/koksmat/docs" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Documentation
        </Link>
        {/* <Link
          href="/shadcn/docs/components"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/shadcn/docs/components")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Components
        </Link> */}
        {/* <Link
          href="/koksmat/christianiabpos/koksmat"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/shadcn/examples")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Examples
        </Link>

        <Link
          href={siteConfig.links.github}
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
          )}
        >
          GitHub
        </Link> */}
      </nav>
    </div>
  )
}
