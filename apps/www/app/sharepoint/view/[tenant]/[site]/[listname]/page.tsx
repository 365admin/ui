import { ShowItems } from "@/app/sharepoint/components/showitems"


export default function Sandbox({ params }: { params: { tenant: string, site: string,listname:string } }) {
  const { tenant, site,listname } = params
  return <ShowItems tenant={tenant} site={site} listname={listname} />


}
