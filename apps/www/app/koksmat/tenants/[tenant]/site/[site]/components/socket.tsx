"use client"

import { useEffect, useMemo, useState } from "react"
import { strip } from "ansicolor"
import { Centrifuge, TransportEndpoint } from "centrifuge"

import { Button } from "@/registry/new-york/ui/button"

import { MessageType } from "../server/MessageType"

export function SocketLogger(props: {
  channelname: string
  traceHidden?: boolean
  onMessage?: (data: MessageType) => void
}) {
  const log = useMemo<MessageType[]>(() => {
    return []
  }, [])
  const [refresh, setrefresh] = useState(0)
  const [socket, setsocket] = useState<Centrifuge>()
  const onConnect = () => {
    console.log("connected")
    // log.push("connected")

    if (!socket) return
    // socket.emit('helloFromClient',{
    //     "name":"helloFromClient",
    //     "data": "xyz"
    // } );
  }
  const onDisconnect = () => {
    console.log("disconnected")
    //  log.push("disconnected")
  }

  const receiver = (data: { channel: string; data: MessageType }) => {
    // console.log("received", data);

    log.push(data.data)

    if (props.onMessage) {
      props.onMessage(data.data)
    }
    setrefresh(new Date().getTime())
  }

  useEffect(() => {
    const latestItem = document.getElementById("koksmatlog-" + (log.length - 1))

    latestItem?.scrollIntoView({ behavior: "smooth" })
  }, [refresh])

  useEffect(() => {
    // create and assign a socket to a variable.

    //let socket = new Centrifuge('ws://localhost:8000/connection/websocket')
    //setsocket(socket)
    const transports: TransportEndpoint[] = [
      {
        transport: "websocket",
        endpoint: "ws://localhost:8000/connection/websocket",
      },
      // {
      //   transport: "http_stream",
      //   endpoint: "http://localhost:8000/connection/http_stream",
      // },
      // {
      //   transport: "sse",
      //   endpoint: "http://localhost:8000/connection/sse",
      // },
    ]

    
    const centrifuge = new Centrifuge(transports)
    centrifuge.connect()
    centrifuge.on("connected", onConnect)
    const sub = centrifuge.newSubscription(props.channelname)
    sub.on("publication", receiver)
    sub.subscribe()
    //centrifuge.connect()
    return () => {
      sub.unsubscribe
      centrifuge.disconnect()
    }
  }, [])

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('connected', onConnect);
  //     const sub = socket.newSubscription(props.channelname);
  //     sub.on('publication', receiver);
  //     sub.subscribe()
  //     socket.connect()
  //   }

  // }, [socket])

  if (props.traceHidden) return null
  return (
    <div className="bg-slate-950 p-4 text-green-600">
      {/* <div>Sockets {refresh}</div> */}
      <pre className="h-[500px] overflow-scroll text-xs">
        {log
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((l, i) => {
            return (
              <div
                key={i}
                id={"koksmatlog-" + i}
                className={
                  l.isError ? "text-red-500" : "border-b-0 border-cyan-400"
                }
              >
                {/* Line {i} */}
                {strip(l.message)}
              </div>
            )
          })}
      </pre>
      <Button
        variant="link"
        onClick={() => {
          log.splice(0, log.length)
          setrefresh(new Date().getTime())
        }}
      >
        Clear
      </Button>
    </div>
  )
}
