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

import { PowerShell } from "../../components/powershell"
import { PageContextSectionHeader } from "../../tenants/[tenant]/site/[site]/components/page-section-header"
import ListAzAccounts from "../az-accounts"

export default function AzSubscriptions() {
  const [tryDebug, settryDebug] = useState(false)
  const { setOptions, options } = useContext(KoksmatContext)
  const { showDebug, showContext } = options
  const [answer, setanswer] = useState("?")
  return (
    <div>
      <PageContextSectionHeader title={"Privacy"} />
      <div>
       Privacy is important to us and a legal requirement many where in the world.
       </div>
       <div className="mt-3">
        We do not store any information about you unless it is need for a legal purpose and that you have consented to it.
        </div>
        <div className="mt-3">
        We do not use cookies unless you have consented to it. Cookies will typically be used to store your preferences.
        </div>
        <div className="mt-3">
        We do not track you, do not use any third party tracking services and do not sell any information about you.
    </div>
    </div>
  )
}
