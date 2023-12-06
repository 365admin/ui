import { ca } from "date-fns/locale"
import { ObjectId, OptionalId } from "mongodb"

import { connect } from "@/lib/mongodb"

export async function mongoSaveCargo(
  journey: string,
  journeyId: string,
  cargo: object
) {
  const client = await connect()
  const cargoColl = client.db("journey-" + journey).collection("cargo")

  try {
    console.log("Saving cargo to mongo", journey, journeyId, cargo)

    const updateExisting = await cargoColl.findOneAndReplace(
      { journeyId },
      { ...cargo, journeyId },
      
    )
    if (updateExisting.value) {
      console.log("Updated existing")
      return true
    }
    console.log("Added new")
    await cargoColl.insertOne({ ...cargo, journeyId })

    return true
  } catch (e) {
    console.log("Error saving cargo",e)
  } finally {
    await client.close()
  }

  return false
}

export async function mongoLoadCargo(
  journey: string,
  journeyId: string
) {
  const client = await connect()
  const cargoColl = client.db("journey-" + journey).collection("cargo")

  try {
   

    const record = await cargoColl.findOne(
      { journeyId }
      
    )

    return record
  } catch (e) {
    console.log("Error saving cargo",e)
  } finally {
    await client.close()
  }

  return undefined
}