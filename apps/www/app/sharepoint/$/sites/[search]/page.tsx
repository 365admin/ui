
import { ShowSites } from "@/app/sharepoint/components/showsites"

export default function Sandbox({ params }: { params: { tenant: string,search:string} }) {
  const { tenant,search } = params
  return <ShowSites tenant={tenant} search={search} />


}
