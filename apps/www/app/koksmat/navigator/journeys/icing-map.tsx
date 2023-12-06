"use client"

import { useContext, useEffect } from "react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/registry/new-york/ui/button"
import { Container, Port, Waypoints, Shipping } from "@/app/koksmat/navigator"

import { NavigationContext } from "../context"


export default function IcingMap(props: { whatIf?: boolean }) {
  const { whatIf } = props
  const navigator = useContext(NavigationContext)
  const { batch, version } = navigator
  useEffect(() => {
    navigator.setTraceLevel("warning")
  }, [])

  return (
    <div className="container">
      <div className="flex">
        <div className="w-2/4">
          <Waypoints>
            <Port portname="No configuration">
              <Container containername={"you"}>
                <Shipping
                  label="Get a user started"
                  produce={[`user:${batch}`]}
                  dontparse
                  timeout={8}
                  script={`Write-Host "I am a guy"`}
                  need={[]}
                ></Shipping>
              </Container>
            </Port>
            <Port portname="Microsoft Tenant">
              <Container containername={"you"}>
                <Shipping
                  label="Get the user to sign in"
                  need={[`user:${batch}`]}
                  produce={[`credentials:${batch}`]}
                  dontparse
                  timeout={8}
                  script={`
                
              set-timeout -s 3
              Write-Host "I am a guys with credentials"`}
                ></Shipping>
              </Container>
            </Port>
            <Port portname="SharePoint Site">
              <Container containername={"sharepoint credentials"}>
                <Shipping
                  label="Let user select a tenant"
                  need={[`credentials:${batch}`]}
                  produce={[`selectedtenant:${batch}`]}
                  dontparse
                  timeout={8}
                  script={`Write-Host "I am a guys which have selected a tenant"`}
                ></Shipping>
              </Container>
              <Container containername={"sharepoint site"} />
            </Port>
            <Port portname="SharePoint Configuration Site">
              <Container containername={"sharepoint config"}>
                <Shipping
                  label="Configuration site"
                  need={[`selectedtenant:${batch}`]}
                  produce={[`sharepointsite:${batch}`]}
                  dontparse
                  timeout={8}
                  script={`Write-Host "I am a guys which have a site"`}
                ></Shipping>
              </Container>
            </Port>
            <Port portname="Microsoft Tenant">
              <Container containername={"you"}>
                <Shipping
                  label="Get the user to sign in"
                  need={[`user:${batch}`]}
                  produce={[`credentials2:${batch}`]}
                  dontparse
                  timeout={8}
                  script={`
              
              set-timeout -s 2
              Write-Host "I am a guys with credentials 2"`}
                ></Shipping>
              </Container>
            </Port>
            <Port portname="SharePoint Extention">
              <Container containername={"sharepoint extention"}>
                <Shipping
                  label="Deploy extention"
                  need={[`sharepointsite:${batch}`]}
                  produce={[`deployedextention:${batch}`]}
                  dontparse
                  timeout={8}
                  script={`Write-Host "I have deployed an extention"`}
                ></Shipping>
              </Container>
            </Port>

            <Port portname="Icing Solution" />
          </Waypoints>
        </div>
        <div className="w-2/4">
          <div className="text-xl">Ship loaded with</div>
          <div className="text-xs">
            Batch {batch} Version {version}
          </div>
          <table>
            <tr className="mt-3 font-bold">
              <td className="w-[100px]">Key</td>
              <td>Value</td>
            </tr>

            {navigator.cargoKeys().map((key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{navigator.cargo(key)}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div>
        <Button onClick={() => navigator.newBatch()}>New batch</Button>
      </div>
      <Label>Tracelevel</Label>
      <div className="flex space-x-2">
        <Button
          variant={"link"}
          onClick={() => navigator.setTraceLevel("warning")}
        >
          Warning
        </Button>
        <Button
          variant={"link"}
          onClick={() => navigator.setTraceLevel("info")}
        >
          Info
        </Button>
        <Button
          variant={"link"}
          onClick={() => navigator.setTraceLevel("debug")}
        >
          Debug
        </Button>

        {/* <Switch   id="view-cargo" />
      <Label htmlFor="view-cargo">View Cargo</Label>
    */}
      </div>
    </div>
  )
}
