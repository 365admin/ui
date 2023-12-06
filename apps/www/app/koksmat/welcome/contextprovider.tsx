"use client";

import { useContext, useEffect, useState } from "react";
import { WelcomeContext, WelcomeContextProps } from "./context";

type Props = {
  children?: React.ReactNode;

};

export const WelcomeProvider = ({ children }: Props) => {
  
  const [tenant, settenant] = useState("")
  
  const welcome: WelcomeContextProps = {
    tenant,
    settenant
    }
    
  


  return( <WelcomeContext.Provider value={welcome}>

    {children}
   

  </WelcomeContext.Provider>)
}
