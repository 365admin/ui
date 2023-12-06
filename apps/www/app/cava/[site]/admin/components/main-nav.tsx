import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("my-2 flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/cava/admin"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/cava/admin/orders"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Orders
      </Link>
{/*       
      <Link
        href="/cava/admin/accesscontrol"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Delivery
      </Link> */}
    </nav>
  )
}
