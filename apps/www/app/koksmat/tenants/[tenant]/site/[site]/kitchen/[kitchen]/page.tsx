"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useMemo } from 'react';


import { PageContextSectionHeader } from '../../components/page-section-header';
import { KoksmatContext } from '@/app/koksmat/context';
import { useProcess } from '@/lib/useprocess';
import { MagicboxContext } from '@/app/magicbox-context';

export default function Workspace() {
const {tenant,site,currentKitchen} = useContext(KoksmatContext)
const {root} = useContext(MagicboxContext)
const { isLoading, error, data } = useProcess(
    "pwsh",
    [
        root + `app/koksmat/powershell/get-site.ps1`,
        "-tenantdomain",
        tenant,
        "-siteurl",
        `https://tenants/${tenant}.sharepoint.com/sites/${site}`,
      ],
    10,
    "echo",
    currentKitchen?.cwd
    
  )

useEffect(() => {
  if (data){
    console.log(data)
  }

  
}, [data])
  
    return (<div>
           
   <PageContextSectionHeader title="Introduction" />
    {currentKitchen && <div className="mr-10">
<img  src={currentKitchen.image} alt="Kitchen image"/>

    </div>}
    
    </div>)
}