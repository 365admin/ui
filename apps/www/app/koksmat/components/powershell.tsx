"use client"

import { use, useEffect, useState } from "react"

import RunServerProcess from "../tenants/[tenant]/site/[site]/components/runserverprocess"
import { tr } from "date-fns/locale"
import { MessageType } from "../tenants/[tenant]/site/[site]/server/MessageType"
import { set } from "date-fns"


export function PowerShell<T>(props: {
  produce?: string,
  showResults?: boolean,
  script:string,
  args?: string[],
  dontparse?:boolean,
  showDebug?: boolean,
  timeout?:number,
  ran?:boolean,
  setran?: (ran: boolean) => void,
  children?: React.ReactNode,
  onData?: (data: T)=>void,
  onMessage?: (message: MessageType)=>void,
  onError?: (errorMessage: string) => void
}) {

const {ran, setran,produce} = props
const [error, seterror] = useState("")
const [version, setversion] = useState(0)



const [versionToProduce, setVersionToProduce] = useState("")
useEffect(() => {
  
  if (!produce) return
  if (versionToProduce === produce) return
  setVersionToProduce(produce)
  
}, [versionToProduce,produce])




  return (
    <div>
      
      {error && <div className="text-red-600">{error}</div>}
      <RunServerProcess
      caption="PowerShell"
      timeout={props.timeout?props.timeout:30}
      ran={ran}
      showDebug={props.showDebug}
      setran={setran}
        cmd={"pwsh"}
        args={props.args?props.args:[
          "-Command",
          props.script,
        ]}
        onData={(data) => {
          
          if (props.onData) {
            try {
              const s = data.replaceAll("\n","")
              console.log(s)
              if (props.dontparse) {
                props.onData(s as unknown as T)
                return
              }else
             {
              const o : T = JSON.parse(s)
              
              props.onData(o)
            }
            } catch (error) {
              if (props.onError) {
                
                props.onError("Cannot parse JSON from " +data)
              }
            }
            
          }
        
        }}
        onError={(data) => {
          debugger
          if (props.onError) {
            props.onError(data)
          }
      
        }}
        onMessage={props.onMessage}
   
        channelname={"pwsh"}
      />
    </div>
  )
}
