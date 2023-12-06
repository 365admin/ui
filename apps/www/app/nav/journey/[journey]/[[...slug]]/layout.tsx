"use client"
export const dynamic = "force-dynamic";
import { JourneyLayout } from "@/app/nav/components/default-layout"

export default function Layout(props: {
    children: React.ReactNode
    params: { slug: string[],journey:string,site:string,tenant:string }
  
  }) {

    const {journey,site,tenant} = props.params
    return (
        <JourneyLayout {...props} root={`/nav/journey/`} />
    )
  }