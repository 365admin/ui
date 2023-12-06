import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import { SiteFooter } from "@/components/magicbox-site-footer"
import { SiteHeader } from "@/components/sandbox-site-header"
import { KoksmatToolBar } from "../koksmat/tenants/[tenant]/site/[site]/components/toolbar"
import { MagicBar } from "../magicbox/components/tools"


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "shadcn",
      url: "https://shadcn.com",
    },
  ],
  creator: "shadcn",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@shadcn",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (

    <div className="relative flex min-h-screen flex-col">
     
      <div className="flex">
      <div className="mr-4 hidden md:flex">
        <div className=" w-[64px] border-r border-gray-400">
          <div className="sticky top-[64px]">
            <MagicBar toolbarId={1}/>
          </div>
        </div>
      </div>
        <div className="grow" >
        <SiteHeader />
          <div className="flex-1">{children}</div>


        </div>
      </div>
      <SiteFooter />



      <div>



      </div>
    </div>
  )
}
