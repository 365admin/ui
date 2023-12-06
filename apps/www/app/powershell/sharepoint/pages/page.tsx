/* eslint-disable turbo/no-undeclared-env-vars */

import React from "react"
import { GenericTable } from "@/app/cava/[site]/components/table"
import { getToken, getRootSite, getSubSite, getAllSharePointPage } from "@/lib/officegraph"

export interface Page {
  '@odata.etag': string;
  description: string;
  eTag: string;
  id: string;
  lastModifiedDateTime: string;
  name: string;
  webUrl: string;
  title: string;
  pageLayout: string;
  thumbnailWebUrl: string;
  promotionKind: string;
  showComments: boolean;
  showRecommendedPages: boolean;
  contentType: ContentType;
  createdBy: CreatedBy;
  lastModifiedBy: CreatedBy;
  parentReference: ParentReference;
  publishingState: PublishingState;
  reactions: Reactions;
  titleArea: TitleArea;
}

export interface TitleArea {
  enableGradientEffect: boolean;
  imageWebUrl: string;
  layout: string;
  showAuthor: boolean;
  showPublishedDate: boolean;
  showTextBlockAboveTitle: boolean;
  textAboveTitle: string;
  textAlignment: string;
  imageSourceType: number;
  title: string;
  'authors@odata.type': string;
  authors: any[];
  'authorByline@odata.type': string;
  authorByline: any[];
  isDecorative: boolean;
  hasTitleBeenCommitted: boolean;
  serverProcessedContent: ServerProcessedContent;
}

export interface ServerProcessedContent {
  htmlStrings: any[];
  searchablePlainTexts: any[];
  links: any[];
  imageSources: ImageSource[];
  customMetadata: CustomMetadatum[];
}

export interface CustomMetadatum {
  key: string;
  value: Reactions;
}

export interface ImageSource {
  key: string;
  value: string;
}

export interface Reactions {
}

export interface PublishingState {
  level: string;
  versionId: string;
}

export interface ParentReference {
  siteId: string;
}

export interface CreatedBy {
  user: User;
}

export interface User {
  displayName: string;
  email: string;
}

export interface ContentType {
  id: string;
  name: string;
}

import { z } from "zod"
// This is important, if not set, this page will be statically generated causing the build to fail
// as the build process would need to have access to the database / api's
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Pages ',
}
async function getGraphItems() {
  const token = await getToken(process.env.SPAUTH_TENANTID as string, process.env.SPAUTH_CLIENTID as string, process.env.SPAUTH_CLIENTSECRET as string)
  const rootSiteResponse = await getRootSite(token)
  const subSiteResponse = await getSubSite(token, rootSiteResponse.data?.siteCollection.hostname as string, "sites/nexiintra-home")

  const { data, hasError, errorMessage } = await getAllSharePointPage(token, subSiteResponse.data?.id as string)
  
  if (hasError) {

    console.log(errorMessage)

  }
  
  
return data as Page[]
  

}

export default async function Pages() {
  const pages = await getGraphItems()
  return <div>
    <h1>Pages</h1>
   {pages.map((item,key) => {
      return <div key={key} >
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <img src={item.thumbnailWebUrl}></img>
        <p>{item.id}</p>
      </div>
   })}
  </div>
  // const data = pages.map((item) => {
    
  //   return {
  //     title: item.title,
  //     link: item.webUrl,
  //     details: item.description ?? "no description", 
  //     id: item.id
  //   }
  // })
  

  // return <GenericTable data={data} />
}
