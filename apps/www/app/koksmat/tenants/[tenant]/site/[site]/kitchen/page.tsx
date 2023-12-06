import React from 'react';

import { Kitchen, Koksmat } from "./Kitchens";
import Link from 'next/link';
import { Button } from '@/registry/new-york/ui/button';
import { PageContextHeader } from '../components/page-context-header';
import { useProcess } from "@/lib/useprocess"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/registry/new-york/ui/badge"


import { PopUp } from "../components/popup"
export default function ClusterInfo(props: {params:{site: string,tenant:string}}) {
   const {site,tenant} = props.params;
    return (<div>  <PageContextHeader title="Select Kitchen" />
        <div className=" items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 ">
     
    {Koksmat.instance().kitchens.map((kitchen:Kitchen)=>{
      return (
      
      <div key={kitchen.key}>
        <Card  >
              <CardHeader>
                <CardTitle className="text-2xl">{kitchen.displayName}</CardTitle>
                <CardDescription>
                  
                </CardDescription>
              </CardHeader>
              <CardContent>
                
              </CardContent>
              <CardFooter>
                <p>
                  {" "}
                  <Button >
        <Link href={`/koksmat/tenants/${tenant}/site/${site}/kitchen/${kitchen.key}`}>Open</Link>
        </Button>
                  
                   
                </p>
              </CardFooter>
            </Card>
       
        </div>)
    })}
    </div>
    </div>)
}