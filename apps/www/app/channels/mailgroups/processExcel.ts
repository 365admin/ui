export const TODO = true
import Excel from "exceljs";

import crypto from "crypto"

import { Result } from "@/lib/httphelper";
 

/*
Version 0.2 - PoC
*/
const version = "0.2.Blob"


function hash(s:string){
    var shasum = crypto.createHash('sha1')
  shasum.update(s)
  return shasum.digest('hex') // => "0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33"
  }
  
function parseSheet(sheet : Excel.Worksheet) {

    function isManager(row : Excel.Row) {
        var I = row.getCell("I")
        var M = row.getCell("M")

        if (M.value) {

            return true
        }
        if (I.value === "Employee") {
            return false
        }
        return true

    }
    function mapToKeyValues(map:Map<any,any>,tag = "",suffix = " [Nets]") {
        var result : any[] = []
        Array.from(map.keys()).forEach((keyValue) => {
      
            
            var key = keyValue + suffix
            var keyHash = tag + "-"+  hash(keyValue)
            result.push({ key, keyHash, values: map.get(keyValue) })

        })

        return result.sort((a, b) => {

            if (a.key < b.key) {
                return -1;
            }
            if (a.key > b.key) {
                return 1;
            }
            return 0;

        })
    }
    function uniqueColumns(column : string, managersOnly:boolean, prefix:string,tag:string,suffix:string) {
        var map = new Map()
        var values = []
        var map = new Map()

        sheet.eachRow(function (row, rowNumber) {
            if (rowNumber < 2) return
            if (managersOnly && !isManager(row)) return
            var value = row.getCell(column).value
            if (!value) return
            // if (value.indexOf("object")>-1){
            //     debugger

            // }

            value = prefix + value
            if (map.has(value)) {

                map.get(value).push(row.getCell("C").value)
            } else {
                map.set(value, [row.getCell("C").value])
            }
            values.push(value)
        });
        return mapToKeyValues(map,tag,suffix)

    }

    function L2L3(managersOnly:boolean, prefix:string,tag:string,suffix:string) {
        var values = []
        var map = new Map()

        sheet.eachRow(function (row : any, rowNumber) {
            if (rowNumber < 2) return
            if (managersOnly && !isManager(row)) return
            var L = row.getCell("L")
            var J = row.getCell("J")

            var l3 = row.getCell("L").value.result ? row.getCell("L").value.result : row.getCell("L").value
            var l2 = row.getCell("J").value//ToString()
            if (l3 === "X") return
            if (l3.error) return
            if (l2.error) return
            if (l3 === "[object Object]") {
                return
            }
            var value = prefix + l3 + " (" + l2 + ")"
            if (value.indexOf("object") > -1) {
        
                return
            }

            if (map.has(value)) {
                map.get(value).push(row.getCell("C").value)
            } else {
                map.set(value, [row.getCell("C").value])
            }
            values.push(value)
        });
        return mapToKeyValues(map,tag,suffix)
        //var uniqueValues = new Set(values)
        //return [...uniqueValues]

    }
    function ManagerCountry(prefix:string,tag:string,suffix:string) {
        var values = []
        var map = new Map()

        sheet.eachRow(function (row, rowNumber) {
            if (rowNumber < 2) return



            var manager = row.getCell("H").value
            var country = row.getCell("E").value//ToString()

            var value = prefix + " " + manager + " in " + country


            if (map.has(value)) {
                map.get(value).push(row.getCell("C").value)
            } else {
                map.set(value, [row.getCell("C").value])
            }
            values.push(value)
        });
        return mapToKeyValues(map,tag,suffix)
        //var uniqueValues = new Set(values)
        //return [...uniqueValues]

    }
    function L3Country(prefix:string,tag:string,suffix:string) {
        var values = []
        var map = new Map()

        sheet.eachRow(function (row : any, rowNumber) {
            if (rowNumber < 2) return



            
            var l3 = row.getCell("L").value.result ? row.getCell("L").value.result : row.getCell("L").value
            var l2 = row.getCell("J").value//ToString()
            if (l2.error) return
            if (l3 === "X") return
            if (l3.error) return
            
            if (l3 === "[object Object]") {
                debugger
            }
            var country = row.getCell("E").value//ToString()

            var value = prefix + " " + l3 + " (" + l2 + ") in " + country


            if (map.has(value)) {
                map.get(value).push(row.getCell("C").value)
            } else {
                map.set(value, [row.getCell("C").value])
            }
            values.push(value)
        });
        return mapToKeyValues(map,tag,suffix)
        //var uniqueValues = new Set(values)
        //return [...uniqueValues]

    }

    function locations(managersOnly:boolean, prefix:string,tag:string,suffix:string) {
        var values = []
        var map = new Map()
        sheet.eachRow(function (row, rowNumber) {
            if (rowNumber < 2) return
            if (managersOnly && !isManager(row)) return
            var K = row.getCell("K")

            var value = prefix + K.value

            if (map.has(value)) {
                map.get(value).push(row.getCell("C").value)
            } else {
                map.set(value, [row.getCell("C").value])
            }
            values.push(value)
        });

        return mapToKeyValues(map,tag,suffix)
        //var uniqueValues = new Set(values)
        //return [...uniqueValues]

    }
    function OrgUnits(prefix:string,tag:string,suffix:string) {
        var values = []
        var map = new Map()
        sheet.eachRow(function (row, rowNumber) {
            if (rowNumber < 2) return
            var F = row.getCell("F")
            var G = row.getCell("G")
            var value = prefix + G.value + " (" + F.value + ")"
            if (value.indexOf("object") > -1) {
                debugger
            }
            if (map.has(value)) {
                map.get(value).push(row.getCell("C").value)
            } else {
                map.set(value, [row.getCell("C").value])
            }
            values.push(value)
        });

        return mapToKeyValues(map,tag,suffix)
        //var uniqueValues = new Set(values)
        //return [...uniqueValues]

    }



    var columns : string[] = []

    sheet.getRow(1).eachCell((cell : Excel.Cell) => columns.push(cell.value as string))

    var segments = []

    segments.push({
        name: "Companies",
        values: uniqueColumns("D", false, "All employees ","company"," [Nets]")
    })

    segments.push({
        name: "Organisational Units",
        
        values: OrgUnits("OU ","ou"," [Nets]")
    })

    segments.push({
        name: "Countries",
        
        values: uniqueColumns("E", false, "All employees ","country"," [Nets]")
    })
    segments.push({
        name: "Managers only pr Country",
        
        values: uniqueColumns("E", true, "All managers ","country-managers"," [Nets]")
    })
    segments.push({
        name: "BU/GU",
        
        values: uniqueColumns("J", false, "All employees ","bu"," [Nets]")
    })
    segments.push({
        name: "Managers only pr BU/GU",
        
        values: uniqueColumns("J", true, "All managers ","bu-managers"," [Nets]")
    })
    segments.push({
        name: "Locations",
        
        values: locations(false, "All employees at ","locations"," [Nets]")
    })
    segments.push({
        name: "Managers only pr Location ",
        
        values: locations(true, "All managers at ","location-managers"," [Nets]")
    })
    segments.push({
        name: "Level 3 Units",
        
        values: L2L3(false, "Level 3 All employees ","l3"," [Nets]")
    })
    segments.push({
        name: "Level 3 pr Country",
        
        values: L3Country("Level 3 All employees","l3-country"," [Nets]")
    })
    segments.push({
        name: "Level 3 Managers",
        
        values: L2L3(true, "Level 3 All managers","l3-managers"," [Nets]")
    })

    segments.push({
        name: "Direct Reports to pr Country",
        
        values: ManagerCountry("Reporting to","reportto-country"," [Nets]")
    })




    return { version, columns, segments };

}
  
  export interface Segments {
    version: string
    columns: string[]
    segments: Segment[]
  }
  
  export interface Segment {
    name: string
    values: Value[]
  }
  
  export interface Value {
    key: string
    keyHash: string
    values: string[]
  }

export function processExcel(workbook: Excel.Workbook): Promise<Result<Segments>> {
  return new Promise(async (resolve, reject) => {

    var sheets : Excel.Worksheet[]= [];
    workbook.worksheets.forEach(ws => sheets.push(ws));

    if (sheets.length !== 1) {

      resolve({ hasError: true, errorMessage: "Only one Sheet supported pr file" });

      return;
    }

    var ws: Excel.Worksheet = workbook.worksheets[0];
    var row: Excel.Row = ws.getRow(1);
    var columns : string[]= [];

    var onSheetLoaded = await parseSheet(ws);
    row.eachCell(cell => columns.push(cell.value as string));
    const result : Segments = { version, columns, segments: onSheetLoaded.segments };
    resolve({ hasError: false, data: result });

  });

}
