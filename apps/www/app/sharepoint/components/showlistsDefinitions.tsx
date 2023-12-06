"use client"
import { useEffect, useState } from "react"

import Link from "next/link"
import { MODULENAME } from "@/app/sharepoint"
export  function ShowDefinitions(props: {  tenant: string,site: string, map:   { listName: string; dependencies: string[] }[]  }) {
  const { tenant, site ,map} = props

  const [error, seterror] = useState("")
  const [dependencies, setDependencies] = useState<any[]>([])
  const [lists, setLists] = useState<any[]>([])
  useEffect(() => {
    const load = async () => {
      const nodes: Map<string, { listName: string; dependencies: string[] }> =
        new Map()

      map.forEach((value, key) => {
        nodes.set(value.listName, value)
      })
      setLists(map.filter((node: any) => node.dependencies.length === 0))
      setDependencies(
        map
          .filter((node: any) => node.dependencies.length > 0)
          .sort((a, b) => {
            const bNode = nodes.get(b.listName)

            if (bNode) {
              for (let index = 0; index < bNode.dependencies.length; index++) {
                const element = bNode.dependencies[index]

                if (element === a.listName) {
                  return -1
                }
              }
            }

            return a.listName
              .toLowerCase()
              .localeCompare(b.listName.toLowerCase())
          })
      )
    }
    load()
  }, [])

  if (error) {
    return <div className="text-red-600">{error}</div>
  }
  return (
    <div style={{ padding: "100px" }}>
      {lists.map((node: any, index: any) => {
        return (
          <div key={index}>
            <div className="text-xl"><Link href={`/${MODULENAME}/view/${tenant}/${site}/${node.listName}`}> {node.listName}</Link></div>
          </div>
        )
      })}
      {dependencies.map((node: any, index: any) => {
        return (
          <div key={index}>
            <div className="text-xl"><Link href={`/${MODULENAME}/view/${tenant}/${site}/${node.listName}`}> {node.listName}</Link></div>
            <div className="flex gap-2">
              {node.dependencies.map((dep: any, index: any) => {
                return (
                  <div className="flex gap-2" key={index}>
                    {dep}
                  </div>
                )
              })}{" "}
            </div>
          </div>
        )
      })}
     
    </div>
  )
}
