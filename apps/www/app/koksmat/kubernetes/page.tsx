import React from 'react';

import RunServerProcess from '@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess';

export default function ClusterInfo() {
   
    return (<div><div>Clusters</div>
      <RunServerProcess cmd={'kubectl'} args={["cluster-info"]} timeout={10} channelname={'kubectx'}  />
    
    </div>)
}