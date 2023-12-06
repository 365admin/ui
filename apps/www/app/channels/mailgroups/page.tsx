"use client"

import { Button } from "@/registry/new-york/ui/button"
import { loadAndparseExcel } from "./server"
import { useState } from "react"

export default function Page() {
    const [sheetData, setsheetData] = useState<any>()
    return (
        <div>
            <Button onClick={async () => {
                await loadAndparseExcel()
            }}>
                Load

            </Button>
            <pre>
                {JSON.stringify(sheetData, null, 2)}
            </pre>

        </div>
    )

}