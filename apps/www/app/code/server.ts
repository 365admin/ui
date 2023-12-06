"use server"

import * as fs from "fs"

import { MagicApp } from "./process"

export const readProcessdata = async (filepath: string) => {
  const filedata = fs.readFileSync(filepath, "utf8")
  return JSON.parse(filedata) as MagicApp
}
