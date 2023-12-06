/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useContext, useMemo, useState } from 'react';
import RunServerProcess from '@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess';
import { KoksmatContext } from '@/app/koksmat/context';
import { MagicboxContext } from '@/app/magicbox-context';
import { Result } from '@/lib/httphelper';
import { Button } from '@/registry/new-york/ui/button';


export default function CheckWorkspace(props:{children?: React.ReactNode}) {
  const { kitchen, station, currentstation } = useContext(KoksmatContext)
  const magicbox = useContext(MagicboxContext)
  const [ran, setran] = useState(false)
  const [result, setresult] = useState<Result<string>>()
  return (<div>
   
    {result && <div className="mr-4 flex">
      {result?.hasError && <div className="text-red-500">{result?.errorMessage}</div>}
    
      {!result && <div className="mr-4 flex">Checking Workspace</div>}
      <div className="grow" />
      
    </div>}

    {kitchen && station && currentstation &&
      <RunServerProcess cmd="pwsh"
        args={[magicbox.root + "app/koksmat/powershell/station-validate-folder.ps1", "-root", magicbox.kitchenroot, "-kitchenName", kitchen, "-stationname", station, "-repourl", currentstation.repoUrl]
        } timeout={10} channelname={'code-validate'} ran={ran} setran={setran} setresult={setresult} />
    }
    {result && !result?.hasError && <div>
      {props.children}
      </div>
    
    }
  </div>)
}