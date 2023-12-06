

export interface CookingStation {
    key: string;
    displayName: string;
    cwd: string;
    kitchenUrl: string;
    image: string;
    repoUrl: string;
    } 

export interface Kitchen {
    key: string;
    displayName: string;
    cwd: string;
    kitchenUrl: string;
    description?:string
    image: string;
    stations: CookingStation[];
    } 

// singleton class with Kitchens and other configurational data
// https://en.wikipedia.org/wiki/List_of_cuisines
export class Koksmat {
    private static _instance: Koksmat;
    private _kitchens: Kitchen[] = [{
        "key": "intra-prod",
        "displayName": "Langosteria",
        "kitchenUrl": "https://www.langosteria.com",
        "image": "https://magicbox.blob.core.windows.net/icons/langosteria.jpg",
        "cwd": "/Users/nielsgregersjohansen/code/koksmat/branches/ui",
        "stations": [        {
            "key": "ui",
            "displayName": "UI",
            "cwd": "/Users/nielsgregersjohansen/kitchens/noma/ui",
            "kitchenUrl": "https://www.langosteria.com",
            "image": "https://magicbox.blob.core.windows.net/icons/langosteria.jpg",
            "repoUrl": ""
        },]
    },
    {
        "key": "danish",
        "displayName": "Danish Cuisine",
        "description":"",
        "kitchenUrl": "https://en.wikipedia.org/wiki/Danish_cuisine",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ristet_rugbr%C3%B8d_med_r%C3%B8get_pebermakrel_og_r%C3%B8r%C3%A6g_%286896213175%29.jpg/2880px-Ristet_rugbr%C3%B8d_med_r%C3%B8get_pebermakrel_og_r%C3%B8r%C3%A6g_%286896213175%29.jpg",
        "cwd": "/Users/nielsgregersjohansen/kitchens/danish",
        "stations": [
            {
                "key": "icing",
                "displayName": "Icing",
                "cwd": "/Users/nielsgregersjohansen/kitchens/danish/icing",
                "kitchenUrl": "https://www.langosteria.com",
                "image": "https://upload.wikimedia.org/wikipedia/commons/f/f8/Danish_with_icing.jpg",
                "repoUrl": "https://github.com/koksmat-com/sharepoint.git"
            }
            
        ]
    }];
    public static instance(): Koksmat{
        if (!Koksmat._instance) {
            Koksmat._instance = new Koksmat();
        }
        return Koksmat._instance;
    }
    
    public get kitchens() : Kitchen[] {
        return this._kitchens
    }
    
}