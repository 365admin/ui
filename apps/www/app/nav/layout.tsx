"use client"

import React, { useContext, useEffect } from "react"
import { NavigationProvider } from "@/app/koksmat/navigator/contextprovider"
import { SecurityContextProvider } from "./contextprovider"
import { SecurityContext } from "./context"

export default function JourneyLayoutRoot(props: {
  children: React.ReactNode
}) {

 
  
  
  return (
  <SecurityContextProvider>
      <NavigationProvider>
  
          {props.children}

      </NavigationProvider>
      </SecurityContextProvider>

  )
}
