import { MainNavItem, SidebarNavItem } from "types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/shadcn/docs",
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
          href: "/shadcn/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/shadcn/docs/installation",
          items: [],
        },
        {
          title: "Theming",
          href: "/shadcn/docs/theming",
          items: [],
        },
        {
          title: "Dark mode",
          href: "/shadcn/docs/dark-mode",
          items: [],
        },
        {
          title: "CLI",
          href: "/shadcn/docs/cli",
          items: [],
        },
        {
          title: "Typography",
          href: "/shadcn/docs/components/typography",
          items: [],
        },
        {
          title: "Figma",
          href: "/shadcn/docs/figma",
          items: [],
        },
        {
          title: "Changelog",
          href: "/shadcn/docs/changelog",
          items: [],
        },
        {
          title: "About",
          href: "/shadcn/docs/about",
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
   
    {
      title: "Components",
      items: [
        {
          title: "Accordion",
          href: "/shadcn/docs/components/accordion",
          items: [],
        },
        {
          title: "Alert",
          href: "/shadcn/docs/components/alert",
          items: [],
        },
        {
          title: "Alert Dialog",
          href: "/shadcn/docs/components/alert-dialog",
          items: [],
        },
        {
          title: "Aspect Ratio",
          href: "/shadcn/docs/components/aspect-ratio",
          items: [],
        },
        {
          title: "Avatar",
          href: "/shadcn/docs/components/avatar",
          items: [],
        },
        {
          title: "Badge",
          href: "/shadcn/docs/components/badge",
          items: [],
        },
        {
          title: "Button",
          href: "/shadcn/docs/components/button",
          items: [],
        },
        {
          title: "Calendar",
          href: "/shadcn/docs/components/calendar",
          items: [],
        },
        {
          title: "Card",
          href: "/shadcn/docs/components/card",
          items: [],
        },
        {
          title: "Checkbox",
          href: "/shadcn/docs/components/checkbox",
          items: [],
        },
        {
          title: "Collapsible",
          href: "/shadcn/docs/components/collapsible",
          items: [],
        },
        {
          title: "Combobox",
          href: "/shadcn/docs/components/combobox",
          items: [],
        },
        {
          title: "Command",
          href: "/shadcn/docs/components/command",
          items: [],
        },
        {
          title: "Context Menu",
          href: "/shadcn/docs/components/context-menu",
          items: [],
        },
        {
          title: "Data Table",
          href: "/shadcn/docs/components/data-table",
          items: [],
        },
        {
          title: "Date Picker",
          href: "/shadcn/docs/components/date-picker",
          items: [],
        },
        {
          title: "Dialog",
          href: "/shadcn/docs/components/dialog",
          items: [],
        },
        {
          title: "Dropdown Menu",
          href: "/shadcn/docs/components/dropdown-menu",
          items: [],
        },
        {
          title: "Form",
          href: "/shadcn/docs/components/form",
          items: [],
        },
        {
          title: "Hover Card",
          href: "/shadcn/docs/components/hover-card",
          items: [],
        },
        {
          title: "Input",
          href: "/shadcn/docs/components/input",
          items: [],
        },
        {
          title: "Label",
          href: "/shadcn/docs/components/label",
          items: [],
        },
        {
          title: "Menubar",
          href: "/shadcn/docs/components/menubar",
          items: [],
        },
        {
          title: "Navigation Menu",
          href: "/shadcn/docs/components/navigation-menu",
          items: [],
        },
        {
          title: "Popover",
          href: "/shadcn/docs/components/popover",
          items: [],
        },
        {
          title: "Progress",
          href: "/shadcn/docs/components/progress",
          items: [],
        },
        {
          title: "Radio Group",
          href: "/shadcn/docs/components/radio-group",
          items: [],
        },
        {
          title: "Scroll Area",
          href: "/shadcn/docs/components/scroll-area",
          items: [],
        },
        {
          title: "Select",
          href: "/shadcn/docs/components/select",
          items: [],
        },
        {
          title: "Separator",
          href: "/shadcn/docs/components/separator",
          items: [],
        },
        {
          title: "Sheet",
          href: "/shadcn/docs/components/sheet",
          items: [],
        },
        {
          title: "Skeleton",
          href: "/shadcn/docs/components/skeleton",
          items: [],
        },
        {
          title: "Slider",
          href: "/shadcn/docs/components/slider",
          items: [],
        },
        {
          title: "Switch",
          href: "/shadcn/docs/components/switch",
          items: [],
        },
        {
          title: "Table",
          href: "/shadcn/docs/components/table",
          items: [],
        },
        {
          title: "Tabs",
          href: "/shadcn/docs/components/tabs",
          items: [],
        },
        {
          title: "Textarea",
          href: "/shadcn/docs/components/textarea",
          items: [],
        },
        {
          title: "Toast",
          href: "/shadcn/docs/components/toast",
          items: [],
        },
        {
          title: "Toggle",
          href: "/shadcn/docs/components/toggle",
          items: [],
        },
        {
          title: "Toolbar",
          href: "/shadcn/docs/components/magic-toolbar",
          items: [],
        },

        {
          title: "Tooltip",
          href: "/shadcn/docs/components/tooltip",
          items: [],
        },
      ],
    },
  ],
}
