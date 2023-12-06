import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig  = (tenant:string,site:string,workspace:string) : DocsConfig =>  {return {
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
      title: "Core",
      items: [
        {
          title: "Subscriptions",
          href: `/koksmat/azure`,
          items: [],
        },
        {
          title: "App Registrations",
          href: `/koksmat/azure/apps`,
          items: [],
        },

        
      ],
    },
    {
      title: "Kubernetes ",
      items: [
       
        {
          title: "Azure Clusters",
          href: `/koksmat/azure/aks`,
          items: [],
        }, 
        
 
      ]
    },
    // {
    //   title: "Installation",
    //   items: [
    //     {
    //       title: "SharePoint Extention",
    //       href: "/shadcn/docs/installation/next",
    //       items: [],
    //     },
    //     {
    //       title: "Outlook",
    //       href: "/shadcn/docs/installation/vite",
    //       items: [],
    //     },
    //     {
    //       title: "Teams",
    //       href: "/shadcn/docs/installation/remix",
    //       items: [],
    //     },
    //     {
    //       title: "Kubernetes",
    //       href: "/shadcn/docs/installation/gatsby",
    //       items: [],
    //     },
    //     {
    //       title: "Exchange Administration",
    //       href: "/shadcn/docs/installation/astro",
    //       items: [],
    //     },
    //     {
    //       title: "SharePoint Administration",
    //       href: "/shadcn/docs/installation/manual",
    //       items: [],
    //     },
    //     {
    //       title: "PowerApps & Automate Administration",
    //       href: "/shadcn/docs/installation/manual",
    //       items: [],
    //     },
    //   ],
    // },
   
   
      
    
  ],
}}
