/* eslint-disable turbo/no-undeclared-env-vars */



import "./home-animations.css"
import { use } from "react"
import { redirect } from "next/navigation";
import { getCookie } from "./profile/actions/getCookies"
import { NexiWelcomePage } from "@/components/welcomepages/nexi-welcomepage"

export default function WelcomePage(){
  
switch (process.env.HOMEPAGE ??"") {
  case "koksmat":
    redirect("/koksmat")
    return <div>Koksmat</div>
    break;

  default:
    return <NexiWelcomePage />
    break;
}
return null
}