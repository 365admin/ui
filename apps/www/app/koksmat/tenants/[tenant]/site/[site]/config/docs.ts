import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Orders",
      href: "/catering/orders",
    },
   
    {
      title: "Lists",
      href: "https://christianiabpos.sharepoint.com/sites/Cava3/_layouts/15/viewlsts.aspx?view=14",
    },
   
  
   
  ],
  sidebarNav: [
    // {
    //   title: "Logs",
    //   items: [
    //     {
    //       title: "Audit",
    //       href: "/powershell/admin/logs/auditlog/mongo",
    //       items: [],
    //     },
       
    //   ],
    // },

  ],

  
}
