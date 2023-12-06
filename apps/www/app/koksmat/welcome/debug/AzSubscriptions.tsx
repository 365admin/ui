"use client";
import React, { useContext, useEffect, useState } from 'react';
import { KoksmatContext } from '@/app/koksmat/context';
import { PageContextSectionHeader } from '../../tenants/[tenant]/site/[site]/components/page-section-header';
import { PowerShell } from '../../components/powershell';




export default function AzSubscriptions() {

  const koksmat = useContext(KoksmatContext);
  useEffect(() => {
    if (!koksmat.options.showDebug) {
      //koksmat.setOptions({showDebug:true,showContext:koksmat.options.showContext})
    }

  }, [koksmat]);

  const [data, setdata] = useState("");

  const [error, seterror] = useState("");
  const [log, setlog] = useState("");
  return (<div>


    <PageContextSectionHeader title={'Components'} />
    <PowerShell<any>
      timeout={8}
      script={`  
        $max = 6

        for ($i = 0; $i -lt $max; $i++) {
          write-Error "Hello $i"
            Start-Sleep 1
           
              Write-Error "Tick $i"
          
        }
        convertto-json "Hello World" 

    `}
      onData={(data) => { setdata(data); }}
      onMessage={(message) => { setlog(message.message); }}
      onError={(error) => { seterror(error); }} />
    <div>
      <div>
        <div>Last Message</div>
        <div className='font-bold'>{log}</div>
      </div>
      <div>
        <div>Result</div>
        <div className='font-bold text-green-500'>{data}</div>
      </div>
      <div>
        <div>Error</div>
        <div className='font-bold text-red-600'>{error}</div>
      </div>
    </div>


  </div>

  );
}
