"use server"

import * as fs from "fs"
import * as path from "path"
import { cwd } from "process"
import { launchEditor } from "@/navigator/lib/launchEditor"

import { TreeNode, displayNameFromFilename, isHiddenFromFilename } from "."
import { getLevels } from "./components"
import { mongoLoadCargo, mongoSaveCargo } from "./storage/mongo"

function nodesFromDirectory(dirName: string): TreeNode[] {
  const dir = fs.readdirSync(dirName, { withFileTypes: true })

  const leafs = dir.map((file) => {
    const filePath = path.join(dirName, file.name)
    const title = file.name

    const children = file.isDirectory() ? nodesFromDirectory(filePath) : []
    //const properties any[] = [] //file.isFile() ? getProperties(filePath) : undefined
    return {
      filename: title,

      isHidden: isHiddenFromFilename(title),
      displayName: displayNameFromFilename(title),
      isDirectory: file.isDirectory(),
      children,
      path: filePath,
    } as TreeNode
  })
  return leafs
}

export async function nodes(dirName: string) {
  return nodesFromDirectory(dirName)
}


export async function launchPageFromSlug(journey: string, slug: string) {
  const elements = slug.split("/")

  console.log("Path", cwd(), slug)
  const navRoot = path.join(cwd(), "app/nav/custom")
  const levels = getLevels(journey, slug.split("/"))

  if (!levels.journey) return

  const journeyPath = path.join(navRoot, levels.journey)


  if (!levels.port) return

  let filename = ""
  filename += "port-" +levels.port

  if (!levels.container) return


  filename += "-container-" +levels.container

  launchEditor(path.join(journeyPath, `${filename}.tsx`), 25, 9)
}
export async function createPageFromSlug(journey: string, slug: string) {
  const elements = slug.split("/")

  console.log("Path", cwd(), slug)
  const navRoot = path.join(cwd(), "app/nav/custom")
  const levels = getLevels(journey, slug.split("/"))

  if (!levels.journey) return
  fs.mkdirSync(navRoot, { recursive: true })
  const journeyPath = path.join(navRoot, levels.journey)
  fs.mkdirSync(journeyPath, { recursive: true })

  if (!levels.port) return

  let filename = ""
  filename += "port-" +levels.port

  // const portPath = path.join(journeyPath, `/port/${levels.port}`)
  // fs.mkdirSync(portPath, { recursive: true })
  if (!levels.container) return


  filename += "-container-" +levels.container

  // const containerPath = path.join(portPath, `/container/${levels.container}`)
  // fs.mkdirSync(containerPath, { recursive: true })
  const key = "`port/${position.port}/container/${position.container}`"
  const containerPageSrc = `
  "use client"

  import { useContext } from "react"
  import { NavigationContext } from "@/navigator/context"
  import { Button } from "@/registry/new-york/ui/button"
  import { Container, Port } from "@/app/nav/components"
  import { launchPageFromSlug } from "@/app/nav/server"
  import { Badge } from "@/registry/new-york/ui/badge"

  export default function Page() {
    const navigator = useContext(NavigationContext)
    const {  position, currentWaypoint, currentContainer } = navigator
  
    return (
      <div className="min-h-screen">
      <Badge>Under contruction</Badge>
        <Button
          onClick={async () => {
            launchPageFromSlug(
              position.journeyName,
              ${key}
            )
          }}
        >
          Edit Page
        </Button>
  
        <Port waypoint={currentWaypoint} params={{ portname: position.port }}>
          <div></div>
        </Port>
        <Container
          waypoint={currentWaypoint}
          container={currentContainer}
          params={{
            portname: position.port,
            containername: position.container,
          }}
        />
      </div>
    )
  }
  
`
  fs.writeFileSync(path.join(journeyPath, `${filename}.tsx`), containerPageSrc)
  launchEditor(path.join(journeyPath, `${filename}.tsx`), 25, 9)
}


export async function saveCargo(journey : string, id : string,cargo: object) {
  
 return mongoSaveCargo(journey,id,cargo)

}

export async function loadCargo(journey : string, id : string) {
  
  return mongoLoadCargo(journey,id)
 
 }