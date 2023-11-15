"use server"
import { runProcess } from "../../[tenant]/site/[site]/server/runProcess";

export async function setNamespace(namespace:string){
    await runProcess("kubectl",["config","set-context","--current","--namespace",namespace],20,"setNamespace")
}

