"use client"
import React, { use, useState } from 'react';

import { useProcess } from '@/lib/useprocess';
import { Button } from '@/registry/new-york/ui/button';
import { set } from 'date-fns';
import { PopUp } from '../../tenants/[tenant]/site/[site]/components/popup';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Badge } from '@/registry/new-york/ui/badge';
import { PageContextHeader } from '../../tenants/[tenant]/site/[site]/components/page-context-header';
import { ViewKubernetesNamespace } from './ViewKubernetesNamespace';
import { setNamespace } from './server';
export interface Root {
    apiVersion: string
    items: Item[]
    kind: string
    metadata: Metadata2
  }
  
  export interface Item {
    apiVersion: string
    kind: string
    metadata: Metadata
    spec: Spec
    status: Status
  }
  
  export interface Metadata {
    creationTimestamp: string
    labels: Labels
    name: string
    resourceVersion: string
    uid: string
    annotations?: Annotations
  }
  
  export interface Labels {
    "kubernetes.io/metadata.name": string
    "kustomize.toolkit.fluxcd.io/name"?: string
    "kustomize.toolkit.fluxcd.io/namespace"?: string
    "app.kubernetes.io/managed-by"?: string
    "addonmanager.kubernetes.io/mode"?: string
    "control-plane"?: string
    "kubernetes.azure.com/managedby"?: string
    "kubernetes.io/cluster-service"?: string
    "olm.operatorgroup.uid/ae71b5a1-9089-4b97-953d-11ab6d3b61ef"?: string
    "pod-security.kubernetes.io/audit"?: string
    "pod-security.kubernetes.io/audit-version"?: string
    "pod-security.kubernetes.io/enforce"?: string
    "pod-security.kubernetes.io/enforce-version"?: string
    "pod-security.kubernetes.io/warn"?: string
    "pod-security.kubernetes.io/warn-version"?: string
  }
  
  export interface Annotations {
    "fluxcd.io/ignore"?: string
    "linkerd.io/inject"?: string
    "kubectl.kubernetes.io/last-applied-configuration"?: string
    "meta.helm.sh/release-name"?: string
    "meta.helm.sh/release-namespace"?: string
  }
  
  export interface Spec {
    finalizers: string[]
  }
  
  export interface Status {
    phase: string
  }
  
  export interface Metadata2 {
    resourceVersion: string
  }
  
  
function convert(data: string): Root | null {
    if (!data) return null
    return JSON.parse(data) as Root
  
  }
  export default function ViewKubernetesNamespaces() {


    const { isLoading, error, data } = useProcess("kubectl", ["get","namespaces","-o=json"], 20, "echo")
    const [selectedNamespace, setselectedNamespace] = useState<Item>()
    const [currentNamespace, setcurrentNamespace] = useState("")
    const [showDetails, setshowDetails] = useState(false)
  
    return (<div>

      {isLoading && <div>Loading...</div>}
  
      {error && <div className="text-red-700">{error}</div>}
      <ViewKubernetesNamespace onChanged={ (namespace) =>{
            setcurrentNamespace(namespace)
        } } />
        <div className=" items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 ">
      
        {convert(data)?.items?.map((item: Item) => <div key={item.metadata.name}  ><Card 
        className={currentNamespace===item.metadata.name?"bg-green-100":""}
        
        >
  <CardHeader>
    <CardTitle className="text-2xl">{item.metadata.name}</CardTitle>
    <CardDescription>Version {item.metadata.resourceVersion}</CardDescription>
  </CardHeader>
  <CardContent>
  <p>
          
          
         
  
         </p>
  </CardContent>
  <CardFooter>
    <p>
         {/* <Button onClick={() => {
            setselectedNamespace(item)
            setshowDetails(true)
          }}>Details</Button>  */}
          <Button  onClick={async () => {
            await setNamespace(item.metadata.name)
            setcurrentNamespace(item.metadata.name)
          }}>Set current</Button>
          </p>
  </CardFooter>
</Card></div>
)}
      </div>
      <PopUp show={showDetails} onClose={() => setshowDetails(false)} title={selectedNamespace?.metadata.name ?? "Details"} description={""} >
  
        
        <pre>{JSON.stringify(selectedNamespace,null,2)}</pre>
      </PopUp>
    </div>
    )
  }