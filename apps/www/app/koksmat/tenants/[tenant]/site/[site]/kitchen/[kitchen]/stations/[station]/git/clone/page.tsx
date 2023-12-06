"use client"
import React, { useContext, useMemo } from 'react';

import RunServerProcess from '@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess';
import { KoksmatContext } from '@/app/koksmat/context';

export default function Release() {
  const koksmat = useContext(KoksmatContext);
    return (<div>
    {koksmat?.currentstation && <div>
      <div>Code</div>
      <RunServerProcess cmd={'git'} args={[ "clone", koksmat.currentstation.repoUrl,"sourcecode" ]} timeout={120} channelname={'gh'} cwd={koksmat.currentstation.cwd} />
    </div>}
    
    </div>)
}