/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from 'react';

import RunServerProcess from '@/app/koksmat/[tenant]/[site]/components/runserverprocess';
import { findWorkspace } from '..';
import { PageContextSectionHeader } from '../../components/page-section-header';

interface WorkspaceProps {
    params: {
        workspace: string;
    }
}

export default function Workspace(props: WorkspaceProps) {
  const ws = useMemo(() => {return findWorkspace(props.params.workspace)}, [props.params.workspace]);

   
    return (<div>
           
   <PageContextSectionHeader title="Introduction" />
    {ws && <div>
<img src={ws.image} alt="Kitchen image"/>

    </div>}
    
    </div>)
}