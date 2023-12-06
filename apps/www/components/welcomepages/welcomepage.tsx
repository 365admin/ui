"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"

import Logo from "@/components/logo"

import { getUserCookie } from "../../app/profile/actions/getCookies"

export function WelcomePage() {
  //const data = cookies().has("user") ? JSON.parse(cookies().get("user")?.value as string) : {}
  const [cookieData, setcookieData] = useState<{
    country: string | undefined
    unit: string | undefined
  }>({ country: undefined, unit: undefined })
  useEffect(() => {
    async function getCookieData() {
      const cookieData = await getUserCookie()

      if (cookieData.country && cookieData.unit) {
        localStorage.setItem("user", JSON.stringify(cookieData))
        setcookieData(cookieData)
      }
    }

    let data = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : {}
    if (data.country && data.unit) {
      redirect(
        "https://365adm.sharepoint.com/sites/365admin?country=" +
          data.country +
          "&unit=" +
          data.unit
      )
    } else {
      getCookieData()
    }
  }, [])

  useEffect(() => {
    if (cookieData.country && cookieData.unit) {
      redirect(
        "https://365adm.sharepoint.com/sites/365admin?country=" +
          cookieData.country +
          "&unit=" +
          cookieData.unit
      )
    }
  }, [cookieData])

  return (
    <div>
  
   
    <div className="relative flex h-screen  place-items-center items-center justify-center  overflow-hidden"> 
    <div className="absolute z-20 "> 
    <div className="home_welcome_animate mx-auto  rounded-xl bg-[#2D32A9] p-10">
          <div className="pb-4 text-2xl text-white">Welcome to 365Admin</div>
          <div>
            <button className="rounded-full bg-[#FFFFFF] px-10 text-[#2D32A9] ">
              {" "}
              <a href="/profile">Click to get started</a>
            </button>
          </div>
        </div>
    </div> 
    <video
      src="https://365admin.blob.core.windows.net/logo/vecteezy_ocean-day-to-night-timelapse_23152644.mp4"
      autoPlay={true}
      loop
      muted
      className="absolute z-10 min-h-full w-auto min-w-full max-w-none"
    ></video>
    
     </div> </div> )
  return (
    <div className="-space  container h-screen  bg-[url('/xoresund.png')] bg-cover text-center">
      <div className="absolute left-8 top-4">
        <Logo homeUrl="/" />
      </div>
     
      <div className="grid h-screen place-items-center">
        <div className="home_welcome_animate mx-auto  rounded-xl bg-[#2D32A9] p-10">
          <div className="pb-4 text-2xl text-white">Welcome to 365Admin</div>
          <div>
            <button className="rounded-full bg-[#FFFFFF] px-10 text-[#2D32A9] ">
              {" "}
              <a href="/profile">Click to get started</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
