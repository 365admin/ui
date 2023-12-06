/* eslint-disable turbo/no-undeclared-env-vars */
"use server"
import Excel from "exceljs";
import { processExcel } from "./processExcel";
import { connect } from "@/lib/mongodb";
import * as fs from "fs"



  
export async function loadAndparseExcel(){
    const filename = "/Users/nielsgregersjohansen/code/koksmat/ui/apps/www/app/channels/mailgroups/Mail List (11-2023).XLSX"
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filename)
    
    const result = await processExcel(workbook)

    fs.writeFileSync("/Users/nielsgregersjohansen/code/koksmat/ui/apps/www/app/channels/mailgroups/segments.json",JSON.stringify(result.data))

    const client = await connect()
    const key = "latest"
    if (result.hasError) {
        console.log("Error parsing Excel", result.errorMessage)
        return false
    }
    if (result.data){
    const latests = await client
      .db(process.env.DATABASE)
      .collection("mailgroups_segmentdata")
      .insertOne(result.data)
    await client.close()}
    return true
   
}