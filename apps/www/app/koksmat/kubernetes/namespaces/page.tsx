import React from 'react';


import RunServerProcess from '@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess';
import ViewKubernetesNamespaces from '.';
import { PageContextHeader } from '../../tenants/[tenant]/site/[site]/components/page-context-header';


export default function Namespaces() {
   
    return (<div className="container">
       <PageContextHeader title="Namespaces"/>
      <ViewKubernetesNamespaces/>
       {/* <div>Current namespace</div>
      <RunServerProcess cmd={'kubectl'} args={["config","view","--minify","-o=json"]} timeout={10} channelname={'kubens--current'}  />
         */}
    </div>)
}