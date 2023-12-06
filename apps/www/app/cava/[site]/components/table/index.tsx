

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

import ToSmall from "@/components/tosmall"





export  function GenericTable(params :  {


  data: any,

  }
) {
 

  return (
    <>
      <ToSmall />
      <div className="hidden h-full flex-1 flex-col   md:flex">

        <DataTable data={params.data} columns={columns} />
      </div>
    </>
  )
}
