import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/koksmat/docs",
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
          href: "/koksmat/docs/koksmat",
          items: [],
        },
        {
          title: "Installation",
          href: "/koksmat/docs/koksmat/getting-started",
          items: [],
        },
       
        {
          title: "CLI",
          href: "/koksmat/docs/koksmat/cli",
          items: [],
        },
        
        {
          title: "Changelog",
          href: "/koksmat/docs/koksmat/changelog",
          items: [],
        },
        {
          title: "About",
          href: "/shadcn/docs/koksmat/about",
          items: [],
        },
      ],
    },
    {
      title: "Installation",
      items: [
        {
          title: "SharePoint Extention",
          href: "/shadcn/docs/installation/next",
          items: [],
        },
        {
          title: "Outlook",
          href: "/shadcn/docs/installation/vite",
          items: [],
        },
        {
          title: "Teams",
          href: "/shadcn/docs/installation/remix",
          items: [],
        },
        {
          title: "Kubernetes",
          href: "/shadcn/docs/installation/gatsby",
          items: [],
        },
        {
          title: "Exchange Administration",
          href: "/shadcn/docs/installation/astro",
          items: [],
        },
        {
          title: "SharePoint Administration",
          href: "/shadcn/docs/installation/manual",
          items: [],
        },
        {
          title: "PowerApps & Automate Administration",
          href: "/shadcn/docs/installation/manual",
          items: [],
        },
      ],
    },
   
   
      
    
  ],
}
