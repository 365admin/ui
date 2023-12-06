import { MainNavItem, SidebarNavItem } from "types/nav"
import { Kitchen } from "./Kitchens"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig  = (tenant:string,site:string,workspace:string,station:string,kitchen?:Kitchen) : DocsConfig =>  {
 const nav: DocsConfig= {
  mainNav: [
    {
      title: "Workspace",
      href: `/koksmat/tenants/${tenant}/site/${site}/kitchen/${workspace}`,
    },
    {
      title: "Components",
      href: "/shadcn/docs/components/accordion",
    },
    {
      title: "Examples",
      href: "/examples",
    },
    {
      title: "Figma",
      href: "/shadcn/docs/figma",
    },
    {
      title: "GitHub",
      href: "https://github.com/shadcn/ui",
      external: true,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/shadcn",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: `/koksmat/tenants/${tenant}/site/${site}/kitchen/${workspace}`,
          items: [],
        },
        {
          title: "Connections",
          href: `/koksmat/tenants/${tenant}/site/${site}/kitchen/${workspace}/connect`,
          items: [],
        },

        
      ],
    },
    
    
   
   
      
    
  ],
}
const cookingStations = kitchen?.stations.map(station => {return {
  title: "Cooking station: "+ station.displayName,
  items: [
   
    {
      title: "Kitchen Tickets",
      disabled: !station,
      href: `/koksmat/tenants/${tenant}/site/${site}/kitchen/${workspace}/stations/${station.key}/github`,
      items: [],
    }, 
    {
      title: "Code",
      disabled: !station,
      href: `/koksmat/tenants/${tenant}/site/${site}/kitchen/${workspace}/stations/${station.key}/code`,
      items: [],
    },
 
    {
      title: "Build",
      disabled: true,
      href: `/koksmat/tenants/${tenant}/site/${site}/kitchen/${workspace}/stations/${station.key}/build`,
      items: [],
    },
    {
      title: "Ship",
      disabled: true,
      href: `/koksmat/tenants/${tenant}/site/${site}/kitchen/${workspace}/stations/${station.key}/ship`,
      items: [],
    },   

  ],
}}) ?? []

nav.sidebarNav.push(...cookingStations)
return nav
}
