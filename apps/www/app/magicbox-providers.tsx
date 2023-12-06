/* eslint-disable turbo/no-undeclared-env-vars */
"use client";

import { useEffect, useState } from "react";
import { MagicboxContextType, MagicboxContext, Session } from "./magicbox-context";
import { useSession } from "next-auth/react";

import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-browser";
// MSAL configuration
const configuration: Configuration = {
  auth: {
    clientId: "1259bb4c-a2f2-4909-91c4-ea31e566bf68",
    authority: "https://login.microsoftonline.com/79dc228f-c8f2-4016-8bf0-b990b6c72e98",
    redirectUri:"/"
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
type Props = {
  children?: React.ReactNode;
};

export const MagicboxProvider = ({ children }: Props) => {

  const { data, status } = useSession()
  const [session, setsession] = useState<Session>()
  const [version, setversion] = useState(0)
  const [root, setroot] = useState("")
  const [kitchenroot, setkitchenroot] = useState("")

  useEffect(() => {
    setsession(data as Session)


  }, [session, status])

  const magicbox: MagicboxContextType = {
    session, version, refresh: () => {
      setversion(version + 1);
    },
    tenant: "christianiabpos",
    root, // : process.env.KOKSMATROOT ?? "",
    kitchenroot //: process.env.KITCHENROOT ?? "" //"/Users/nielsgregersjohansen/kitchens/" // process.env.KITCHENROOT??"" //
    ,
    setPaths: function (root: string, kitchen: string): void {
      setroot(root)
      setkitchenroot(kitchen)
    }
  }
  const pca = new PublicClientApplication(configuration);

  return <MagicboxContext.Provider value={magicbox}>
    <MsalProvider instance={pca}>


      {children}
    </MsalProvider>

  </MagicboxContext.Provider>;
};
