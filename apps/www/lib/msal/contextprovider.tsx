"use client"

import { useContext, useEffect, useState } from "react"

import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-browser";
import {MSALContext, MSALContextProps, Options } from "./context"

type Props = {
  clientId: string,
  authority: string,
  redirectUri: string,
  children?: React.ReactNode
}

export const MSALContextProvider = ({ clientId,authority,redirectUri, children }: Props) => {
  const [options, setoptions] = useState<Options>({showDebug:false})


  const [roles, setroles] = useState<string[]>([])
  // MSAL configuration
const configuration: Configuration = {
  auth: {
    clientId,
    authority,
    redirectUri
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
    loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
            if (containsPii) {
                return;
            }
            
            switch (level) {
                case LogLevel.Error:
                    console.error(message);
                    return;
                case LogLevel.Info:
                    console.info(message);
                    return;
                case LogLevel.Verbose:
                    console.debug(message);
                    return;
                case LogLevel.Warning:
                    console.warn(message);
                    return;
                default:
                    return;
            }
        },
    },
  },
};
  const msalContext: MSALContextProps = {
    roles,
    setRoles: function (roles: string[]): void {
      setroles(roles);
    },
    options,
    setoptions: function (changeOptions: Options): void {
      setoptions({...options,...changeOptions})
    }
  }
  const pca = new PublicClientApplication(configuration);
  return (
    <MSALContext.Provider value={msalContext}>
       <MsalProvider instance={pca}>
      {children}
      </MsalProvider>
    </MSALContext.Provider>
  )
}
