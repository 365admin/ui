"use client"

import { useContext } from "react"
import {NavigationContext} from "@/navigator/context"

export default function Page(props: {
  params: { slug: string[] }
}) {
  const { slug} = props.params
  const navigator = useContext(NavigationContext)
  const {} = navigator

  return (
    <pre className="font-serif text-2xl">
     {JSON.stringify(navigator,undefined,2)}
    </pre>
  )
}
