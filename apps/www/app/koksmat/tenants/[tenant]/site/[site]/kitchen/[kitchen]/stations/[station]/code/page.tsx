/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useContext, useMemo, useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/registry/new-york/ui/button"
import RunServerProcess from "@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess"
import { KoksmatContext } from "@/app/koksmat/context"
import { MagicboxContext } from "@/app/magicbox-context"

import { PageContextSectionHeader } from "../../../../../components/page-section-header"
import CheckWorkspace from "./checkworkspace"

export default function Workspace() {
  const { currentstation } = useContext(KoksmatContext)

  const [run, setrun] = useState(false)
  const [ran, setran] = useState(false)

  return (
    <div>
      <PageContextSectionHeader title="Code" />
      <CheckWorkspace>
        <Button onClick={() => setrun(true)}>Open Visual Studio Code</Button>
        {run && (
          <RunServerProcess
            cmd={"code"}
            args={["."]}
            timeout={10}
            channelname={"git"}
            ran={ran}
            setran={setran}
            cwd={currentstation?.cwd + "/sourcecode"}
          />
        )}
      </CheckWorkspace>
    </div>
  )
}
