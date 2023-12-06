"use client"
import React, { use, useEffect, useState } from 'react';

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
export interface Root {
    kind: string
    apiVersion: string
    preferences: Preferences
    clusters: Cluster[]
    users: User[]
    contexts: Context[]
    "current-context": string
  }
  
  export interface Preferences {}
  
  export interface Cluster {
    name: string
    cluster: Cluster2
  }
  
  export interface Cluster2 {
    server: string
    "certificate-authority-data": string
  }
  
  export interface User {
    name: string
    user: User2
  }
  
  export interface User2 {
    "client-certificate-data": string
    "client-key-data": string
    token?: string
  }
  
  export interface Context {
    name: string
    context: Context2
  }
  
  export interface Context2 {
    cluster: string
    user: string
    namespace: string
  }

  function convert(data: string): Root | null {
    if (!data) return null
    return JSON.parse(data) as Root
  
  }

  export default function ViewKubernetesContexts() {


    const { isLoading, error, data } = useProcess("kubectl", ["config","view","-o=json"], 20, "echo")
    const [selectedCluster, setselectedCluster] = useState<Context>()
    const [showDetails, setshowDetails] = useState(false)
  
    
    return (<div>

      {isLoading && <div>Loading...</div>}
  
      {error && <div className="text-red-700">{error}</div>}
      <div className=" items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 ">
      
        {convert(data)?.contexts?.map((item: Context) => <Card key={item.name} >
  <CardHeader>
    <CardTitle className="text-2xl">{item.name}</CardTitle>
    <CardDescription>Current Namespace: {item.context.namespace}</CardDescription>
  </CardHeader>
  <CardContent>
  <p>
          
          
         
  
         </p>
  </CardContent>
  <CardFooter>
    <p> <Button onClick={() => {
            setselectedCluster(item)
            setshowDetails(true)
          }}>Details</Button></p>
  </CardFooter>
</Card>
)}
      </div>
      <PopUp show={showDetails} onClose={() => setshowDetails(false)} title={selectedCluster?.name ?? "Details"} description={""} >
  
        
        <pre>{JSON.stringify(selectedCluster,null,2)}</pre>
      </PopUp>
    </div>)
  }