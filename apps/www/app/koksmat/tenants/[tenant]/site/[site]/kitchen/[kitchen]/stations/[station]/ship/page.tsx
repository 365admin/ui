import React, { useContext, useMemo } from 'react';

import RunServerProcess from '@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess';
import { KoksmatContext } from '@/app/koksmat/context';

export default function Connections() {
const koksmat = useContext(KoksmatContext)
    return (<div>
    {koksmat?.currentKitchen && <div>
      <div>Code</div>
     
      <RunServerProcess cmd={'code'} args={["-v"]} timeout={10} channelname={'git'} cwd={koksmat?.currentKitchen.cwd} />
    </div>}
    
    </div>)
}