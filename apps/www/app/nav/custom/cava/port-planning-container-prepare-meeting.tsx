"use client"

import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { NavigationContext } from "@/navigator/context"
import { set } from "date-fns"

import { https } from "@/lib/httphelper"
import { Badge } from "@/registry/new-york/ui/badge"

import { SecurityContext } from "../../context"
import MyCalendars from "./components/mycalendars"
import { Value as Calendar } from "./components/mycalendars/schema"

export default function PrepareMeetingComponent() {
  const navigator = useContext(NavigationContext)
  const security = useContext(SecurityContext)
  const [token, settoken] = useState("")
  const [weblink, setweblink] = useState("")

  useEffect(() => {
    const load = async () => {
      const tokenResult = security.getToken(["Calendars.Read.Shared"], false)
      if ((await tokenResult).hasError) {
        //alert("error" + ((await tokenResult).errorMessage ?? "unknown error"))
        return
      }
      settoken((await tokenResult).data ?? "")
    }
    if (!security) return
    if (!security.account) return

    load()
  }, [security])

  const createMeetingPlaceholder = async (calendar: Calendar) => {
    const tokenResult = await security.getToken(["Calendars.ReadWrite"], false)
    // https://learn.microsoft.com/en-us/graph/api/user-post-events?view=graph-rest-1.0&tabs=http
    const calendarItem = await https<any>(
      tokenResult.data ?? "",
      "POST",
      "https://graph.microsoft.com/v1.0/me/calendars/" +
        calendar.id +
        "/events",
      {
        subject: "Meeting Placeholder",
        start: {
          dateTime: "2023-12-01T12:00:00",
          timeZone: "UTC",
        },
        end: {
          dateTime: "2023-12-01T13:00:00",
          timeZone: "UTC",
        },
        location: {
          displayName: "Placeholder",
        },
      }
    )
    if (calendarItem?.data?.webLink) {
      navigator.ship("id",calendarItem.data.id)
navigator.setInstanceId(calendarItem.data.id)
      setweblink(calendarItem.data.webLink)
    }
  }

  return (
    <div className="min-h-screen">
      <Badge>Alpha</Badge>
      {token && !weblink && (
        <div>
          Find the calendar that will be used for storing the meeting
          <MyCalendars
            token={token}
            onSelect={(calendar) => {
              createMeetingPlaceholder(calendar)
            }}
          />
        </div>
      )}
      {weblink && (
        <Link target="_blank" href={weblink}>
          Open event
        </Link>
      )}
    </div>
  )
}
