import { Button } from "@/registry/new-york/ui/button"
import Link from "next/link"
import * as crypto from "crypto"
export default function Page(props: { params: { journey:string } }) {


    const {journey} = props.params
  return <div>
    <Button><Link href={`./${journey}/${ crypto.randomUUID()}`}>New Journey</Link></Button>

    </div>
}