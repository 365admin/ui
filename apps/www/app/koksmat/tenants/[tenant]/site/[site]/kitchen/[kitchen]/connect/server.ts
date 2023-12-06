"use server"

import { runProcess } from "../../../server/runProcess"


export async function setSubscription(subscription:string){
    await runProcess("az",["account","set","--subscription",subscription],20,"setSubscription")
}

