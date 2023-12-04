import React, { useEffect, useState } from "react"
import mermaid from "mermaid"

import { tagsToNames } from "../lib"
import { Container, Root as Journey, Waypoint } from "./journey-schema"

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
  themeCSS: `
    g.classGroup rect {
      fill: #282a36;
      stroke: #6272a4;
    } 
    g.classGroup text {
      fill: #f8f8f2;
    }
    g.classGroup line {
      stroke: #f8f8f2;
      stroke-width: 0.5;
    }
    .classLabel .box {
      stroke: #21222c;
      stroke-width: 3;
      fill: #21222c;
      opacity: 1;
    }
    .classLabel .label {
      fill: #f1fa8c;
    }
    .relation {
      stroke: #ff79c6;
      stroke-width: 1;
    }
    #compositionStart, #compositionEnd {
      fill: #bd93f9;
      stroke: #bd93f9;
      stroke-width: 1;
    }
    #aggregationEnd, #aggregationStart {
      fill: #21222c;
      stroke: #50fa7b;
      stroke-width: 1;
    }
    #dependencyStart, #dependencyEnd {
      fill: #00bcd4;
      stroke: #00bcd4;
      stroke-width: 1;
    } 
    #extensionStart, #extensionEnd {
      fill: #f8f8f2;
      stroke: #f8f8f2;
      stroke-width: 1;
    }`,
  fontFamily: "Fira Code",
})

function getWho(container: Container): string {
  if (container.who.length === 0) return "unknown"
  return container.who[0].split(" ")[0]
}

function getApprover(container: Container): string {
  if (!container.approve) return ""
  return container.approve[0].split(" ")[0]
}

export default function MermaidView(props: { waypoint: Waypoint }) {
const { waypoint } = props
  const [diagram, setdiagram] = useState("")
  useEffect(() => {
    if (!waypoint) return

    // mermaid.init(undefined, document.getElementsByClassName("mermaid"));
    let d: string = ""

    d += "sequenceDiagram\n"

    waypoint?.loads?.containers.map((container) => {
    const from = getWho(container)
    const to  = getApprover(container)
    if (from && to){
        d += `\tNote right of ${to}: ${container.name}\n`
        d += `\tloop Until approved\n`
      d += `\t\t${from}->>${to}: Hello ${getApprover(container)}, do you approve ${container.name} ?\n`
      d += `\t\t${to}->>${from}: I answer yes or no!"?\n`
      d += `\tend\n`
    }
    container.consult?.forEach((consult) => {
       
      
        d += `\t${from}->>${consult}:  ${consult}, do you approve? !\n`
        d += `\t${consult}->>${from}: I might answer with ...!"?\n`

    })
    container.inform?.forEach((inform) => {
        d += `\t${from}->>${inform}:  ${inform}, I will do ${container.name} !\n`
    })

    })
    

    setdiagram(d)
  }, [waypoint])

  useEffect(() => {
    if (!diagram) return
    mermaid.contentLoaded()
  }, [diagram])

   return null

  return <div>
    <pre className="mermaid">{diagram}</pre>
    <pre >{diagram}</pre>
    </div>
}
