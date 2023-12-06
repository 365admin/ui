import { ReactElement } from "react"

import { NavigationProvider } from "./contextprovider"

export default function Map1(props: {children:ReactElement}) {
  const {children} = props
  return (
    <div>
      <NavigationProvider>
        {children}
      </NavigationProvider>
    </div>
  )
}
