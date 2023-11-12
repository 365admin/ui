import { docsConfig } from "../links"

import { ScrollArea } from "@/registry/new-york/ui/scroll-area"
import { GitSidebarNav } from "../sidebar-nav"
import { SiteHeader } from "../header"
import { PageContextHeader } from "../../components/page-context-header"
import { findWorkspace } from '..';
import { useMemo } from "react"
interface DocsLayoutProps {
  children: React.ReactNode
  params: {
  tenant:string
  site:string
  workspace:string
  }
}

export default function DocsLayout({ children,params }: DocsLayoutProps) {
  const ws = useMemo(() => {return findWorkspace(params.workspace)}, [params.workspace]);


  const {tenant,site,workspace} = params
  
  return (
    <div className="border-b">
<PageContextHeader title={"Kitchen: "+ (ws?.displayName ?? "...")} />
<div className="mr-4 mt-[-10px] text-right text-xs"  >{ws?.cwd}</div>
      <div className=" flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
            <GitSidebarNav items={docsConfig(tenant,site,workspace).sidebarNav} />
          </ScrollArea>
        </aside>
        {children}
      </div>
    </div>
  )
}
