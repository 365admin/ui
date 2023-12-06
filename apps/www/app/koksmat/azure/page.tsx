"use client"
import React, { useContext, useMemo, useState } from 'react';
import { KoksmatContext } from '@/app/koksmat/context';


import { PageContextSectionHeader } from '../tenants/[tenant]/site/[site]/components/page-section-header';
import ListAzAccounts from './az-accounts';




export default function AzSubscriptions() {
  
  const koksmat = useContext(KoksmatContext);
 return (<div>

   
      <PageContextSectionHeader title={'Azure Subscriptions'} />
 <ListAzAccounts/>

    </div>

 )
}