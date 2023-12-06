

import { ModeToggle } from "@/components/mode-toggle"

import { UserNav } from "../dashboard/components/user-nav"
import { SiteMenu } from "./sitemenu"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function SiteHeader(props: { site: string }) {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className=" flex h-[64px] items-center">
        <SiteMenu  site={props.site}/>
        <div className="grow"></div>
        <div className="w-[300px]">
  
        </div>

<div className="grow"></div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            
          </div>
          <nav className="flex items-center">
   

            <ModeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
