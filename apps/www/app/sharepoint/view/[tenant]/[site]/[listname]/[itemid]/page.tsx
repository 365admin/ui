import { ShowItem } from "@/app/sharepoint/components/showitem"


export default function Sandbox({ params }: { params: { tenant: string, site: string,listname:string,itemid:string } }) {
  const { tenant, site,listname,itemid } = params
  return <ShowItem tenant={tenant} site={site} listname={listname} itemid={itemid} />




}
