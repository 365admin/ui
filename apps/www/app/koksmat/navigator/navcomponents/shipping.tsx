"use client"

// copilot document this
//
import React, { use, useContext, useEffect, useState } from "react"
import { set } from "date-fns"

import { Button } from "@/registry/new-york/ui/button"
import { KoksmatContext } from "@/app/koksmat/context"

import { PowerShell } from "../../components/powershell"
import { PageContextSectionHeader } from "../../tenants/[tenant]/site/[site]/components/page-section-header"
import { NavigationContext } from "../context"

export interface ShippingProps {
  label: string
  need: string[]
  produce: string[]
  dontparse: boolean
  script: string
  showDebug?: boolean
  timeout: number
  simulate?: boolean
  children?: React.ReactNode | React.ReactNode[]
}

export default function ShippingComponent(props: ShippingProps) {
  const navigator = useContext(NavigationContext)
  const { need, produce, label, simulate } = props

  const [data, setdata] = useState("")
  const [error, seterror] = useState("")
  const [log, setlog] = useState("")

  const { cargo, ship, batch, version } = navigator
  const [satisfied, setsatisfied] = useState(false)
  const [working, setworking] = useState(false)

  const [ran, setran] = useState(false)
const [script, setscript] = useState("")
useEffect(() => {
  const finalScript = `
  function run {
    ${props.script}
  }
  run
  `


setscript(finalScript)
 
}, [props.script])

  useEffect(() => {
    if (!navigator.shippingMan) return
    const subscriptionId = navigator.shippingMan.subscribe(need, {
      onTagAdded: (tag, data) => {
        let allNeedSatisfied = true

        for (const n of need) {
          if (!cargo(n)) {
            allNeedSatisfied = false
            break
          }
        }
        setsatisfied(allNeedSatisfied)
      },
    })

    return () => {
      navigator.shippingMan.unsubscribe(subscriptionId)
    }
  }, [cargo, navigator.shippingMan, need])

  useEffect(() => {
    if (!simulate) return
    const timer = setTimeout(() => {
      setsatisfied(true)
    }, 2000)
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [simulate])

  return (
    <div>
      {navigator.traceLevel > 3 && (
        <div>
          <div className="mb-4">
            <div className="flex">
              <div className="font-bold">{label}</div>
              <div className="grow"></div>
              <Button
                variant={"link"}
                onClick={() => {
                  produce.forEach((p) => {
                    ship(p, "dummy")
                  })
                }}
              >
                Produce all{" "}
              </Button>
            </div>
            <div className="text-xs">
              need:{" "}
              <span className="font-bold">
                {need ? need.join(" | ") : "n.a."}{" "}
              </span>{" "}
              produce :
              <span className="font-bold">
                {produce ? produce.join(" | ") : "n.a."}{" "}
              </span>
              satisfied{" "}
              <span className="font-bold">
                {satisfied ? "Satisfied" : "Not Satisfied"}{" "}
              </span>
              working:
              <span className="font-bold">
                {working ? "Working" : "Not Working"}
              </span>
            </div>
            <div className="font-bold text-green-500">{data}</div>
            <div className="font-bold text-red-600">{error}</div>
          </div>
          {error && (
            <div>
              <div>
                <div>Last Message</div>
                <div className="font-bold">{log}</div>
              </div>
              <div>
                <div>Error</div>
                <div className="font-bold text-red-600">{error}</div>
              </div>
            </div>
          )}
        </div>
      )}
      {satisfied && (
        <PowerShell<any>
          showDebug={navigator.traceLevel > 3}
          ran={ran}
          setran={(r) => {
            setran(r)
          }}
          onData={(data) => {
            setworking(false)
            produce.forEach((p) => {
              ship(p, data)
            })
            setdata(data)
          }}
          onMessage={(message) => {
            setlog(message.message)
          }}
          onError={(error) => {
            seterror(error)
          }}
          script={script}
        />
      )}
    </div>
  )
}
