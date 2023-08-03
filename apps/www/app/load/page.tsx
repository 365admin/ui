
import Link from "next/link";
import Logo from "@/components/logo";

import '../globals.css'

import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/providers"
import { SiteFooter } from "@/components/magicbox-site-footer"
import { SiteHeader } from "@/app/powershell/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster as DefaultToaster } from "@/registry/default/ui/toaster"
import { Toaster as NewYorkToaster } from "@/registry/new-york/ui/toaster"
import { NextAuthProvider } from "../providers";
import { ForModule, ForRole } from "@/components/roles";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

export default function RootPage() {

  const data = cookies().has("user") ? JSON.parse(cookies().get("user")?.value as string ) : {}
  if (data.country && data.unit) {
redirect("https://christianiabpos.sharepoint.com/sites/nexiintra-home?country="+data.country+"&unit="+data.unit)

  }

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextAuthProvider>
              <div className="-space  container h-screen  bg-[url('/NexiEurope.svg')] bg-cover text-center">
                <div className="absolute left-8 top-4">
                  <Logo homeUrl="/" />
                </div>
                {/* <TopNavigation {...topNavigationProps} /> */}
                <div className="grid h-screen place-items-center">
                  <div className=" w-screen bg-[#FFFFFFAA] p-10">
                    <div className="pb-4 text-2xl text-black">Welcome to Nexi Group</div>
                    <div>
                      <button  className="cursor-pointer rounded-full bg-[#2D32A9] from-green-400 to-blue-500 p-2 px-10 text-white hover:from-pink-500 hover:to-yellow-500">
                        {" "}
                        <a href="/welcome">Click to get started</a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <ForModule module="Developer">
                <SiteFooter />
              </ForModule>
            </NextAuthProvider>
          </ThemeProvider>
          <Analytics />
          <NewYorkToaster />
          <DefaultToaster />
        </body>
      </html>
    </>
  )
}
