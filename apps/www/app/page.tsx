/* eslint-disable turbo/no-undeclared-env-vars */



import "./home-animations.css"
import { use } from "react"
import { redirect } from "next/navigation";
import { getCookie } from "./profile/actions/getCookies"
import { WelcomePage } from "@/components/welcomepages/welcomepage"

export default function HomePage(){
  
switch (process.env.HOMEPAGE ??"") {
  case "koksmat":
    redirect("/koksmat")
    return <div>Koksmat</div>
    break;

  default:
    return <WelcomePage />
    break;
}
return null
}