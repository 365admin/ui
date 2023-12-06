
import * as fs from "fs"
import * as path from "path"
import rehypeStringify from "rehype-stringify"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

import {
  Container,
  Waypoint,
} from "@/app/koksmat/navigator/navcomponents/journey-schema"

import { Port } from "../koksmat/navigator"
import { getLevels } from "./components"

export interface TreeNode {
  filename: string
  path: string
  displayName: string
  children: TreeNode[]
  isDirectory: boolean
  isHidden?: boolean
}

export const displayNameFromFilename = (filename: string) => {
  const s = filename.split(" ")
  if (parseInt(s[0]) > 0) {
    return s.slice(1).join(" ")
  } else return filename
}

export const isHiddenFromFilename = (filename: string) => {
  const s = filename.split(" ")
  if (s[0].toLowerCase().indexOf("index") > -1) {
    return true
  } else return false
}



export function journeyFromNodes(nodes: TreeNode[]): Waypoint[] {

return nodes.filter(node=>!node.isHidden) .map((node) => {
    const port = node.displayName
    const container : Container = {
       container: {},
        name: "Manifest",
        key: "",
        who: [],
        needs: [],
        produces: [],
        script: ""
    }
    return { port, loads:{containers:[container]}, services:[] } as Waypoint
  })
}



export function customComponentKey(slug: string){

  const levels = getLevels("", slug.split("/"))
  let filename = ""
  filename += "port-" +levels.port

  if (!levels.container) return


  filename += "-container-" +levels.container
  return filename

}