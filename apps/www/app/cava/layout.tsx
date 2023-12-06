import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import { SiteFooter } from "@/components/magicbox-site-footer"
import { SiteFooter as LocalSiteFooter } from "./[site]/components/site-footer"
import { SiteHeader } from "@/app/cava/[site]/components/site-header"

import { MagicBar } from "@/app/magicbox/components/tools"
import { CavaProvider } from "./[site]/cavacontextprovider"

interface RootLayoutProps {
  children: React.ReactNode
  params: { site: string }
}

export const metadata: Metadata = {
  title: {
    default: "Cava",
    template: `%s - Cava`,
  },

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


  },

}


export default function RootLayout({ children, params }: RootLayoutProps) {



  return (
    <div>
      <CavaProvider site="cava3" >
        {children}
      </CavaProvider>
    </div>
  )
}
