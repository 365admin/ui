/* eslint-disable turbo/no-undeclared-env-vars */

import { connect } from "@/lib/mongodb"
import { getSpAuthToken } from "@/lib/officegraph"
import {
  getCountries,
  getNewsCategories,
  getNewsChannels,
  getUnits,
  getValidGuestDomains,
} from "@/app/profile/data/sharepoint"

import { Country, NewsCategory, NewsChannel, Unit } from "./schemas"

const KEY = "profilecache"
export interface ProfileCache {
  date: Date
  key: string
  countries: Country[]
  categories: NewsCategory[]
  units: Unit[]
  channels: NewsChannel[]
}

export async function readProfileData() {
  const token = await getSpAuthToken()
  await getValidGuestDomains(token)

  const countries = (await getCountries(token)) ?? []
  const categories = (await getNewsCategories(token)) ?? []
  const units = (await getUnits(token)) ?? []
  const channels = (await getNewsChannels(token)) ?? []
  const cache: ProfileCache = {
    date: new Date(),
    key: KEY,
    countries,
    categories,
    units,
    channels,
  }
  return cache
}
export async function refreshProfileCache() {
    console.log("Refreshing profile cache")
  const client = await connect()
  const cache = await readProfileData()

await client
    .db(process.env.DATABASE)
    .collection<ProfileCache>("cache")
    .deleteMany({ key: KEY })

    await client
      .db(process.env.DATABASE)
      .collection<ProfileCache>("cache")
      .insertOne(cache)
  
  await client.close()
  return cache
}

export async function getProfileCache() {
  const client = await connect()

  let cache = await client
    .db(process.env.DATABASE)
    .collection<ProfileCache>("cache")
    .findOne({ key: KEY })

  // if (cache) {
  //   const now = new Date()
  //   const diff = now.getTime() - cache.date.getTime()
  //   const diffInMinutes = Math.round(diff / 60000)
  //   if (diffInMinutes > 1) {
  //     await refreshProfileCache()
  //     cache = await client
  //       .db(process.env.DATABASE)
  //       .collection<ProfileCache>("cache")
  //       .findOne({ key: KEY })
  //   }
  // }else{
  //   await refreshProfileCache()
  //   cache = await client
  //     .db(process.env.DATABASE)
  //     .collection<ProfileCache>("cache")
  //     .findOne({ key: KEY })
  // }

  await client.close()
  return cache
}
