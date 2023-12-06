
import { ShowLists } from "../../../components/showlists"

export default function Sandbox({ params }: { params: { tenant: string, site: string } }) {
  const { tenant, site } = params
  return <ShowLists tenant={tenant} site={site}  />


}
