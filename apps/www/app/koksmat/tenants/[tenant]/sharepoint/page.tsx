import React from 'react';

import RunServerProcess from '@/app/koksmat/tenants/[tenant]/site/[site]/components/runserverprocess';
import { PageContextHeader } from '../site/[site]/components/page-context-header';

export default function SharePointSites() {
   
    return (<div><PageContextHeader title="SharePoint"/>
      {/* <RunServerProcess cmd={'pwsh'} args={["/Users/nielsgregersjohansen/kitchens/noma/get-site-allpages-test.ps1","-siteurl","https://christianiabpos.sharepoint.com/sites/nexiintra-hub"]} timeout={3600} channelname={'pwsh'}  />
     */}
    </div>)
}