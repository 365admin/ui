"use client"

import { useContext } from "react"

import { KoksmatContext } from "../context"

export function Domain({ children }: { children: React.ReactNode }) {
  const { domain } = useContext(KoksmatContext)
  return (
    <div>
      <div className="mb-3 text-lg font-bold">Active domain: {domain}</div>
      {domain &&  <div>
      {children}
      </div>}
    </div>
  )
}
