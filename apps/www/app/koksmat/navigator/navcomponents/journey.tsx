"use client"

import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import Editor, { Monaco } from "@monaco-editor/react"

import { Button } from "@/registry/new-york/ui/button"
import { KoksmatContext } from "@/app/koksmat/context"
import { Container, Port, Shipping, Waypoints } from "@/app/koksmat/navigator"
import { SeaViewProps } from "@/app/koksmat/navigator/navcomponents/seaviewprops"

import { NavigationContext } from "../context"
import { CargoHold } from "../journeys/[journey]/[id]/[[...slug]]"
import { Root as Journey } from "./journey-schema"
import { tagsToNames } from "../lib"
import MermaidView from "./mermaid"

export function JourneyView(props: {
  children?: SeaViewProps | SeaViewProps[]
  showAllChildren?: boolean
  travelplan: Journey
  id: string
  journey: string
  slug: string[]
}) {
  function properties<T>(obj: object) {
    const x = Object.keys(obj) as (keyof T)[]
    return x
  }
  const { slug, journey, id, travelplan, children, showAllChildren } = props
  const navigator = useContext(NavigationContext)
  const cargoHold = useMemo(() => new CargoHold(travelplan), [travelplan])
  const koksmat = useContext(KoksmatContext)

  const { instanceId, setInstanceId } = navigator

  const [viewPath, setviewPath] = useState("")
  const [generateCode, setgenerateCode] = useState(false)
  const editorRef = useRef(null)
  const [visibleChilds, setvisibleChilds] = useState<SeaViewProps[]>([])
  //const [cargoHold, setcargoHold] = useState<CargoHold>()
  function handleEditorDidMount(editor: any, monaco: Monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    //console.log("hhh", editor, monaco)
    editorRef.current = editor
  }
  // useEffect(() => {
  //   const c = new CargoHold(travelplan)
  //   setcargoHold(c)
  //   return () => {
  //     if (cargoHold) {
  //       cargoHold.close()
  //     }
  //   }
  // }, [cargoHold, travelplan])

  useEffect(() => {
    if (!children) return
    const childsToShow: SeaViewProps[] = []

    if (Array.isArray(children)) {
      if (showAllChildren) {
        childsToShow.push(...children)
      } else {
        children.forEach((child, ix) => {
          if (
            child &&
            child.props &&
            child.props.match &&
            slug &&
            slug.join("/").startsWith(child.props.match)
          ) {
            childsToShow.push(child)
            //child.props.value = "xx:"+ix
            // cargoHold?.addContainer(child.props.containername, child)
          }
        })
      }
    } else {
      if (showAllChildren) {
        childsToShow.push(children)
      } else {
        if (
          children.props &&
          children.props.match &&
          slug &&
          slug.join("/").startsWith(children.props.match)
        ) {
          childsToShow.push(children)
          //children.props.value = "xx"
          // cargoHold?.addContainer(children.props.containername, children)
        }
      }
    }
    setvisibleChilds(childsToShow)
  }, [children, slug, showAllChildren])

 

  useEffect(() => {
    setInstanceId(decodeURIComponent(id))
    setviewPath(decodeURIComponent(slug ? slug.join("/") : ""))
  }, [slug, id, setInstanceId])

  return (
    <div>
      <div className="">{children}</div>
      {navigator.traceLevel > 2 && (
        <div>
          {navigator.cargoKeys().length > 0 && (
            <table>
              <tr className="mt-3 font-bold">
                <td className="w-[200px]">Key</td>
                <td>Value</td>
              </tr>

              {navigator.cargoKeys().map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{navigator.cargo(key)}</td>
                </tr>
              ))}
            </table>
          )}
        </div>
      )}

      <div className="mr-6 flex">
        <div>
          {/* <Label>Tracelevel</Label> */}

          {/* <div>
          <Button onClick={() => navigator.newBatch()}>New batch</Button>
        </div> */}
        </div>
        <div className="grow"></div>
        <div className="text-xs">
          Journey: {journey} Id: {instanceId} Batch {navigator.batch} Path{" "}
          {viewPath} Version {navigator.version}
        </div>
      </div>
      <div className="border">
        <div className="flex space-x-2">
          <Button
            variant={"link"}
            onClick={() => {
              navigator.setTraceLevel("warning")
              koksmat.setOptions({ ...koksmat.options, showDebug: false })
            }}
          >
            Warning
          </Button>
          <Button
            variant={"link"}
            onClick={() => {
              navigator.setTraceLevel("info")
              koksmat.setOptions({ ...koksmat.options, showDebug: false })
            }}
          >
            Info
          </Button>
          <Button
            variant={"link"}
            onClick={() => {
              navigator.setTraceLevel("verbose")
              koksmat.setOptions({ ...koksmat.options, showDebug: false })
            }}
          >
            Verbose
          </Button>
          <Button
            variant={"link"}
            onClick={() => {
              navigator.setTraceLevel("debug")
              koksmat.setOptions({ ...koksmat.options, showDebug: true })
            }}
          >
            Debug
          </Button>
          <Button
            variant={"link"}
            onClick={() => {
              if (!generateCode) {
                koksmat.setOptions({ ...koksmat.options, showDebug: false })
              }
              setgenerateCode(!generateCode)
            }}
          >
            {generateCode ? "Hide Code" : "View Code"}
          </Button>
        </div>

        {navigator.traceLevel > 4 && (
          <div>
            <div>
              {/* <div>
                <div className="text-4xl">Context</div>
                <pre>{JSON.stringify(navigator, null, 2)}</pre>
              </div> */}
              <div>
                <div className="text-4xl">Roles</div>
                <pre>{cargoHold?.roleYaml}</pre>
              </div>
              <div>
                <div className="text-4xl">Entities</div>
                {cargoHold.cargoTypes.sort((a,b)=>a.name.localeCompare(b.name)).map((cargoType) => {
                  return (
                    <div key={cargoType.name}>
                      <div className="text-2xl">{cargoType.name}</div>
                  
                    </div>
                  )
                })}
                <pre>{cargoHold?.cargoYaml}</pre>
              </div>
            </div>
          </div>
        )}

        {generateCode && (
          <div className="w-[980px] border-2">
            <Editor
              height="90vh"
              width="100%"
              defaultLanguage="typescript"
              defaultValue={`
// some comment
export default function View(props: ScopedProps<ViewProps>): SeaView{
  const {children,value} = props
  return (<div>
      {value}
  {children}
  
  </div>)
  }
            `}
              onChange={(value, event) => {
                console.log(value, event)
              }}
              onMount={handleEditorDidMount}
              onValidate={(markers) => {
                console.log(markers)
              }}
            />
          </div>
        )}
   <div>
            <Button onClick={()=>{
              if (travelplan.waypoints.length === 0) return
              if (travelplan.waypoints[0].loads.containers.length === 0) return
              const container = travelplan.waypoints[0].loads.containers[0]
              container.needs.forEach((need)=>{
                
                navigator.ship(need, "seed")
              })

            }}>Seed first containers need</Button>
            </div>
        <Waypoints>
       
          {travelplan.waypoints.map((waypoint) => {
            return (
              <div key={waypoint.port}>
                 
                <Port portname={waypoint.port}>
                  {waypoint?.loads?.containers.map((container) => {
                    return (
                      <div key={container.name}>
                        <Container containername={container.name}>
                
          
                          <Shipping
                            label={container.name}
                            need={tagsToNames(container.needs)}
                            produce={tagsToNames(
                              container.produces)
                            }
                            dontparse={true}
                            script={container.script}
                            simulate={false}
                            timeout={30}
                          />
                        </Container>
                      </div>
                    )
                  })}
                </Port>
              </div>
            )
          })}
        </Waypoints>
      </div>
    </div>
  )
}
