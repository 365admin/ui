"use client"

import React, { useContext, useMemo, useState } from "react"
import Link from "next/link"

import { CardContent, CardFooter } from "@/registry/default/ui/card"
import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { KoksmatContext } from "@/app/koksmat/context"

import { PowerShell } from "../components/powershell"
import { PageContextSectionHeader } from "../tenants/[tenant]/site/[site]/components/page-section-header"
import ListAzAccounts from "./az-accounts"

export default function AzSubscriptions() {
  const [tryDebug, settryDebug] = useState(false)
  const { setOptions, options } = useContext(KoksmatContext)
  const { showDebug, showContext } = options
  const [answer, setanswer] = useState("?")
  return (
    <div>
      <PageContextSectionHeader title={"Introducing Koksmat (Preview)"} />
      <div>
        Welcome to Koksmat. Your helping hand in our digital Kitchen. The word
        Koksmat is danish and means the helping hand to the chef in the kitchen
        of a ship. Helping each others succeed with our work and share our
        knowledge is what this is all about.
      </div>

      <div className="pt-5">
        Koksmat is Open Source:{" "}
        <a
          className="text-blue-700"
          target="_blank"
          href="https://github.com/koksmat-com"
        >
          https://github.com/koksmat-com
        </a>
        .
      </div>

    

      <div className="mt-4">
        <Button>
          <Link href="/koksmat/welcome/connect">Continue</Link>
        </Button>
      </div>
    </div>
  )
}
