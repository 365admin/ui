import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig  = (tenant:string) : DocsConfig =>  {return {
  mainNav: [
    
  ],
  sidebarNav: [
    {
      title: "Getting started",
      items: [
        {
          title: "Introduction",
          href: `/koksmat/welcome`,
          disabled:false,
          items: [],
        },
        {
          title: "Connect to Azure",
          href: `/koksmat/welcome/connect`,
          items: [],
        },
        {
        
          title: "Connect to SharePoint",
          href: `/koksmat/welcome/sharepoint`,
          items: [],
        },
        {
          disabled:!tenant,
          title: "Install Koksmat",
          href: `/koksmat/welcome/sharepoint/deploy`+tenant,
          items: [],
        },
        
      ],
    },
        {
      title: "Compliance & Security",
      items: [
       
        {
          title: "Transparency",
          href: `/koksmat/welcome/transparent`,
          disabled:false,
          items: [],
        },
        {
          title: "Privacy",
          href: `/koksmat/welcome/privacy`,
          disabled:false,
          items: [],
        },
      ]
    }
    // {
    //   title: "Takeaways",
    //   items: [
       
    //     {disabled:true,
    //       title: "SharePoint Branding",
    //       href: `/koksmat/solution/icing`,
    //       items: [],
    //     }, 
        
 
    //   ]
    // },
    // {
    //   title: "Finer food",
    //   items: [
       
    //     {
    //       disabled:true,
    //       title: "Channel management",
    //       href: `/koksmat/solution/icing`,
    //       items: [],
    //     }, 
        
 
    //   ]
    // },
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
