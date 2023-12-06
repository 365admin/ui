import { getCateringProviders, getCurrencies, getItemGroups, getItems, getOrders, getRooms } from './sharepoint';


export async function getCavaOrders(token : string) {



    const cateringProviders = await getCateringProviders(token)
    const itemGroups = await getItemGroups(token)
    const currencies = await getCurrencies(token)
    const items = await getItems(token, cateringProviders, itemGroups, currencies)
    const rooms = await getRooms(token)
    const orders = await getOrders(token, items,rooms)

    return {orders,cateringProviders,itemGroups,currencies,items,rooms}
   
}