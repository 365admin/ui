"use client"
import React, { useContext, useMemo, useState } from 'react';
import { KoksmatContext } from '@/app/koksmat/context';



import ListAzApplications from './az-ad-apps';
import { PageContextSectionHeader } from '../../tenants/[tenant]/site/[site]/components/page-section-header';




export default function AzSubscriptions() {
  
  const koksmat = useContext(KoksmatContext);
 return (<div>

   
      <PageContextSectionHeader title={'Azure Applications'} />
 <ListAzApplications/>

    </div>

 )
}