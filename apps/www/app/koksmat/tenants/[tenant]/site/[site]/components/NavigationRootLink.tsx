"use client"
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"

export function NavigationRootLink({ name, href }: { name: string; href: string; }) {
  const pathname = usePathname()
  return <Link
    href={href}
    className={cn(
      "transition-colors hover:text-foreground/80",
      pathname?.startsWith(href)
        ? "text-foreground"
        : "text-foreground/60"
    )}
  >
    {name }
  </Link>;
}
