"use client"
import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate } from "@azure/msal-react";

export default function MSALWrapper(props:{children:React.ReactNode }){
    const {children} = props
    return (<MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
        {children}
    </MsalAuthenticationTemplate>)
}