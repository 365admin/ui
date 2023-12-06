
import { ShowSites } from "@/app/sharepoint/components/showsites"

export default function Sandbox({ params }: { params: { tenant: string} }) {
  const { tenant } = params
  return <ShowSites tenant={tenant} search={""} />


}
