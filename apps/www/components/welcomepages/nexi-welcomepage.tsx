"use client";
import { redirect } from "next/navigation";
import Logo from "@/components/logo";
import { useEffect, useState } from "react";
import { getUserCookie } from "../../app/profile/actions/getCookies";


export function NexiWelcomePage() {
  //const data = cookies().has("user") ? JSON.parse(cookies().get("user")?.value as string) : {}
  const [cookieData, setcookieData] = useState<{
    country: string | undefined;
    unit: string | undefined;
  }>({ country: undefined, unit: undefined });
  useEffect(() => {
    async function getCookieData() {
      const cookieData = await getUserCookie();

      if (cookieData.country && cookieData.unit) {
        localStorage.setItem("user", JSON.stringify(cookieData));
        setcookieData(cookieData);
      }
    }

    let data = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : {};
    if (data.country && data.unit) {
      redirect(
        "https://christianiabpos.sharepoint.com/sites/nexiintra-home?country=" +
        data.country +
        "&unit=" +
        data.unit
      );
    } else {
      getCookieData();
    }
  }, []);

  useEffect(() => {
    if (cookieData.country && cookieData.unit) {
      redirect(
        "https://christianiabpos.sharepoint.com/sites/nexiintra-home?country=" +
        cookieData.country +
        "&unit=" +
        cookieData.unit
      );
    }
  }, [cookieData]);

  return (
    <div className="-space  container h-screen  bg-[url('/NexiEurope.svg')] bg-cover text-center">
      <div className="absolute left-8 top-4">
        <Logo homeUrl="/" />
      </div>

      <div className="grid h-screen place-items-center">
        <div className="home_welcome_animate mx-auto  rounded-xl bg-[#2D32A9] p-10">
          <div className="pb-4 text-2xl text-white">Welcome to Nexi Group</div>
          <div>
            <button className="rounded-full bg-[#FFFFFF] px-10 text-[#2D32A9] ">
              {" "}
              <a href="/profile">Click to get started</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
