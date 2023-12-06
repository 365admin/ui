import React from 'react';


import RunServerProcess from '@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess';
import ListPods from '.';
import { PageContextHeader } from '../../tenants/[tenant]/site/[site]/components/page-context-header';


export default function Pods() {

  return (<div>
    <PageContextHeader title="Pods" />
    <ListPods />
  </div>)
}