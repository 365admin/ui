"use client"

import { use, useEffect, useState } from "react"

import { Button } from "@/registry/new-york/ui/button"

import { listTravelPlans } from "../components/server"
import { testDocMaker, testStationMaker } from "./server"

export default function Page() {
  const [plans, setplans] = useState<string[]>([])

  useEffect(() => {
    const load = async () => {
      const plans = await listTravelPlans(
        "/Users/nielsgregersjohansen/code/koksmat/ui/apps/www/app/nav/travelplans"
      )
      setplans(plans)
    }
    load()
  }, [])

  return (
    <div>
      Select a journey
      {plans.map((travelPlan) => {
        return (
          <div key={travelPlan} className="flex space-x-2 space-y-2">
            <div>{travelPlan}</div>
            <Button
              onClick={async () => {
                await testDocMaker(travelPlan+".yaml")
              }}
            >
              Make word
            </Button>
            <Button
              onClick={async () => {
                await testStationMaker(travelPlan+".yaml")
              }}
            >
              Make dir
            </Button>
          </div>
        )
      })}
    </div>
  )
}
