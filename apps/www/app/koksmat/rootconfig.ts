

export interface Tenant {
    key: string;
    displayName: string;
   
    tenantName: string;
    defaultSite: string;
    image: string;

    } 

// singleton class with Kitchens and other configurational data

export class RootConfig {
    private static _instance: RootConfig;
    private _tenants: Tenant[] = [{
        "key": "365adm",
        "displayName": "Jumpto365",
       
        "image": "https://magicbox.blob.core.windows.net/icons/langosteria.jpg",
        "tenantName": "365adm",
        "defaultSite": "koksmat"
     
    },
    {
        "key": "christianiabpos",
        "displayName": "nexigroup.com",

        "image": "https://magicbox.blob.core.windows.net/icons/Noma_Projects_102021-26-large-1.webp",
        "tenantName": "christianiabpos",
        "defaultSite": "cava3"
    }];
    public static  instance(){
        if (!RootConfig._instance) {
            RootConfig._instance = new RootConfig();
        }
        return RootConfig._instance;
    }
    
    public get tenants() : Tenant[] {
        return this._tenants
    }

    public findTenant(tenantName:string) : Tenant | undefined{
        return this._tenants.find(t=>t.tenantName === tenantName)
    }
    
}