import { ForRole } from "@/components/roles"
import { siteConfig } from "@/config/site"
import { Button } from "@/registry/new-york/ui/button"
import Link from "next/link"
export function SiteFooter() {
  return (
    <footer className="place-items-center py-6 md:px-8 md:py-0 ">
    <div className=" flex flex-col  justify-between gap-4 md:h-24 md:flex-row ">
      <div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
<div className="flex">

        <ForRole role="Admin" module="Catering">
         
        </ForRole>

        </div>
      </div>
    </div>
  </footer>
  )
}
