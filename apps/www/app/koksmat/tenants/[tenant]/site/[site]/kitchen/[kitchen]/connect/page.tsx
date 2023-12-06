"use client"

import React, { useContext, useMemo, useState } from "react"

import { PageContextSectionHeader } from "../../../components/page-section-header"
import { RegistreEntraIdApplication } from "./entraid-applicationregistration"
import RunServerProcess from "../../../components/runserverprocess"
import { ConnectToSharePoint } from "./connectto-sharepoint"

export default function Connections() {
  return (
    <div>
      <PageContextSectionHeader title="Checking Connections" />
     <ConnectToSharePoint />
      <RegistreEntraIdApplication />
    </div>
  )
}
