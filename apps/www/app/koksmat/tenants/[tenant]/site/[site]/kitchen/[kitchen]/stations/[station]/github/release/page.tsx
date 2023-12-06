import React, { useContext, useMemo } from 'react';

import RunServerProcess from '@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess';
import { KoksmatContext } from '@/app/koksmat/context';

export default function Release() {
  const koksmat = useContext(KoksmatContext);
    return (<div>
    {koksmat?.currentKitchen && <div>
      <div>Code</div>
      <RunServerProcess cmd={'gh'} args={["release", "create", "v1.1.0.2","--target","v1.1", "--notes", `"bugfix release"`]} timeout={10} channelname={'gh'} cwd={koksmat?.currentKitchen?.cwd} />
    </div>}
    
    </div>)
}