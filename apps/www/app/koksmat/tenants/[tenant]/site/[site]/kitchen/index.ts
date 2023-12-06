import { Koksmat,Kitchen,CookingStation } from "./Kitchens";


export function findKitchen(workspaceName: string) : Kitchen | undefined {
    return Koksmat.instance().kitchens.find(x => x.key == workspaceName)
}

export function findCookingStation(kitchen:string,stationName: string) : CookingStation | undefined {
    return findKitchen(kitchen)?.stations.find(x => x.key == stationName)
}