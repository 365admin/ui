"use client";
import { KoksmatContext } from '@/app/koksmat/context';
import { ko } from 'date-fns/locale';
import React, { useContext, useMemo } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link';
import { Button } from '@/registry/new-york/ui/button';

export default function CookingStation() {
    const {currentKitchen,site,tenant,kitchen} = useContext(KoksmatContext);
    return <div>
        {currentKitchen && <div className=" items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 ">
          {currentKitchen?.stations?.map(station => <div key={station.key}>
            <Card  >
              <CardHeader>
                <CardTitle className="text-2xl">{station.displayName}</CardTitle>
                <CardDescription>
                  
                </CardDescription>
              </CardHeader>
              <CardContent>
                
              </CardContent>
              <CardFooter>
                <p>
                  {" "}
                  <Button >
        <Link href={`/koksmat/tenants/${tenant}/site/${site}/kitchen/${kitchen}/stations/${station.key}`}>Open</Link>
        </Button>
                  
                   
                </p>
              </CardFooter>
            </Card>
               

        </div>)}
        </div>    }

    </div>
}