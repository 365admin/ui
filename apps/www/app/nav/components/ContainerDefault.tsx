import { ReactElement, useContext, useState } from "react"
import { CheckCheckIcon } from "lucide-react"

import { Badge } from "@/registry/default/ui/badge"
import { NavigationContext } from "@/app/koksmat/navigator/context"
import { cargoTypeFromTag } from "@/app/koksmat/navigator/journeys/[journey]/[id]/[[...slug]]"
import {
  Container,
  Waypoint,
} from "@/app/koksmat/navigator/navcomponents/journey-schema"

export default function ContainerDefaults(props: {
  params: { portname: string; containername: string }
  waypoint?: Waypoint
  container?: Container
  children?: ReactElement
}) {
  const { children, container } = props
  const { portname, containername } = props.params
  const navigator = useContext(NavigationContext)

  if (!container) return null

  return (
    <div className="mt-4">
      <div className="bold text-2xl">
        Container: {containername} at {portname}
      </div>
      {/* <div>{waypoint?.loads.containers.length ?? 0} Containers to load</div> */}
      {/* <pre>{JSON.stringify(container,null,2)}</pre>  */}
      <div className="mt-4  min-w-full  ">
        <div>
          <div className="border-b-1 font-bold">Needs</div>
          <div>
            {container?.needs?.map((need) => (
              <div key={need}>
                <div className="flex space-x-2 p-1">
                  <div className="flex space-x-2">
                    {cargoTypeFromTag(need).name}{" "}
                    {navigator.cargo(need) && (
                      <CheckCheckIcon className="ml-2 mt-1 h-4 w-4  text-green-500" />
                    )}
                  </div>
                  {cargoTypeFromTag(need).stages.length > 0 && (
                    <Badge variant={"outline"}>
                      state: {cargoTypeFromTag(need).stages[0]}
                    </Badge>
                  )}
                </div>

                {navigator.cargoMetadata(need).map((metadata) => {
                  return (
                    <div className="ml-4 text-xs" key={metadata}>
                      {metadata}{" "}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <div></div>
        </div>
        <div className="grow">
          <div className=" border-b-1  font-bold">Who</div>
          <div>
            {container.who.map((who) => (
              <div className="p-1" key={who}>
                {who}
              </div>
            ))}
          </div>
          <div></div>
        </div>
        <div className="grow">
          <div className=" border-b-1   font-bold">Produces</div>
          <div>
            {container.produces.map((need) => (
              <div className="space-x-2" key={need}>
                <div className="flex ">
                  {cargoTypeFromTag(need).name}{" "}
                 
                  {cargoTypeFromTag(need).stages.length > 0 && (
                    <Badge variant={"outline"}>
                      state: {cargoTypeFromTag(need).stages[0]}
                    </Badge>
                  )}
                   {navigator.cargo(need) && (
                    <CheckCheckIcon className="ml-2 mt-1 h-4 w-4 text-green-500" />
                  )}{" "}
                </div>

                {navigator.cargoMetadata(need).map((metadata) => {
                  return (
                    <div className="ml-4 text-xs" key={metadata}>
                      {metadata}{" "}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </div>
      {children}
    </div>
  )
}
