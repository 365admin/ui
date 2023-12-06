"use client"

import { useContext, useEffect, useState } from "react"
import { MagicboxContext } from "../magicbox-context"
import { https, httpsGetAll } from "@/lib/httphelper"
import { set } from "date-fns"
import Link from "next/link"
import { Button } from "@/registry/new-york/ui/button"
export type Root = Root2[]

export interface Root2 {
  "@odata.etag": string
  createdDateTime: string
  eTag: string
  id: string
  lastModifiedDateTime: string
  webUrl: string
  createdBy: CreatedBy
  lastModifiedBy: LastModifiedBy
  parentReference: ParentReference
  contentType: ContentType
  "fields@odata.context": string
  fields: Fields
}

export interface CreatedBy {
  user: User
}

export interface User {
  email: string
  id: string
  displayName: string
}

export interface LastModifiedBy {
  user: User2
}

export interface User2 {
  email: string
  id: string
  displayName: string
}

export interface ParentReference {
  id: string
  siteId: string
}

export interface ContentType {
  id: string
  name: string
}

export interface Fields {
  "@odata.etag": string
  Title: string
  LinkTitle: string
  Modulename: string
  SiteName: string
  id: string
  ContentType: string
  Modified: string
  Created: string
  AuthorLookupId: string
  EditorLookupId: string
  _UIVersionString: string
  Attachments: boolean
  Edit: string
  LinkTitleNoMenu: string
  ItemChildCount: string
  FolderChildCount: string
  _ComplianceFlags: string
  _ComplianceTag: string
  _ComplianceTagWrittenTime: string
  _ComplianceTagUserId: string
}

export default function Cava() {
const magicbox = useContext(MagicboxContext)
const [instances, setinstances] = useState<Root2[]>([])
const [error, seterror] = useState("")
useEffect(() => {
  const load = async () => {
    if (!magicbox.session?.accessToken){
        return
    }


    const getResponse = await httpsGetAll<Root2>(magicbox.session?.accessToken,  `https://graph.microsoft.com/v1.0/sites/christianiabpos.sharepoint.com:/sites/intra365:/lists/Instances/items?$expand=fields`)
 
    if(getResponse.hasError){
        seterror(getResponse.errorMessage??"Unknown error")
        return
    }
setinstances( getResponse.data ?? [])

}
  load()

}, [magicbox.session?.accessToken])

return (
<div className="container h-screen">
    {error && <div className="text-red-600">{error}</div>}
    <div className="text-xl">Instances</div>
    <div>
        {instances.map((instance) => {
            return <div key={instance.id}>
                <Link href={`/cava/${instance.fields.SiteName}`}><Button variant={"link"}> {instance.fields.Title}</Button></Link>
                </div>
        })}
    </div>
</div>

)

}