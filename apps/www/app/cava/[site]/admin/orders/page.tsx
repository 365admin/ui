/* eslint-disable turbo/no-undeclared-env-vars */

import React from "react"
import { GenericTable } from "../../components/table"
import { getToken, getRootSite, getSubSite, getAllListItems } from "@/lib/officegraph"
import { CateringOrders } from "@/services/sharepoint/cava3/sharepoint"
import {schema} from "../../components/table/data/schema"
import { z } from "zod"
// This is important, if not set, this page will be statically generated causing the build to fail
// as the build process would need to have access to the database / api's
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Orders ',
}
async function getGraphItems() {
  const token = await getToken(process.env.SPAUTH_TENANTID as string, process.env.SPAUTH_CLIENTID as string, process.env.SPAUTH_CLIENTSECRET as string)
  const rootSiteResponse = await getRootSite(token)
  const subSiteResponse = await getSubSite(token, rootSiteResponse.data?.siteCollection.hostname as string, "sites/cava3")

  const { data, hasError, errorMessage } = await getAllListItems(token, subSiteResponse.data?.id as string, CateringOrders.listName)
  if (hasError) {

    console.log(errorMessage)
           
  }
  
  const items = data?.map((item: any) => {
    return CateringOrders.map(item)
    
    
  })


  const spItems = z.array(CateringOrders.schema).parse(items)

  return spItems.map((item) => {
    const i : z.infer<typeof schema> = {
      title: item.Title,
      link: `https://christianiabpos.sharepoint.com/sites/Cava3/Lists/Catering%20Orders/DispForm.aspx?ID=${item.Id}`,
      details: item.OrderData,
      id: ""
    }
    return i
  })

}

export default async function Rooms() {
  const data = await getGraphItems()
  return <div className="container"> <GenericTable data={data} /></div>
}
