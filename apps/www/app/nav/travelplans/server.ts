"use server"
import * as fs from "fs";
import { Document, HeadingLevel, ISectionOptions, Packer, Paragraph, TextRun } from "docx";
import { loadTravelPlan } from "../components/server"
import path from "path";
const root = "/Users/nielsgregersjohansen/code/koksmat/ui/apps/www/app/nav/travelplans/"

export async function  testDocMaker(yamlFile:string){
// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section


const plan = await loadTravelPlan(root+yamlFile,"filesystem")

const sections = plan.waypoints.map((waypoint)=>{ 


    const containers = waypoint.loads?.containers?.map((container)=>{
        return new Paragraph({
            text: container.name,
            heading: HeadingLevel.HEADING_2,
        })
    }) ?? []

    

    const section : ISectionOptions = {
        children: [
            new Paragraph({
                text: waypoint.port,
                heading: HeadingLevel.HEADING_1,
            }),
            ...containers,
        

        ]
    }
    
    return section
})

const doc = new Document({
    sections
});

// Used to export the file into a .docx file
Packer.toBuffer(doc).then((buffer) => {
    const filename = yamlFile.replace(".yaml",".docx")
    fs.writeFileSync(root+filename, buffer);
});

// Done! A file called 'My Document.docx' will be in your file system.


}


export async function  testStationMaker(yamlFile:string){
    function padWithLeadingZeros(num:number, totalLength:number) {
        return String(num).padStart(totalLength, '0');
      }
      
    const plan = await loadTravelPlan(root+yamlFile,"filesystem")
    const recipesRoot = "/Users/nielsgregersjohansen/code/365admin/recipis"
    const stationRoot = path.join(recipesRoot,yamlFile.replace(".yaml",""))
    fs.mkdirSync(stationRoot,{recursive:true})


 plan.waypoints.forEach((waypoint,ix)=>{ 
    const key = padWithLeadingZeros(ix*10,3)
    const portPath = path.join(stationRoot,key + " "+waypoint.port)
    fs.mkdirSync(portPath,{recursive:true})
    waypoint.loads?.containers?.forEach((container,ix)=>{
    
        const key = padWithLeadingZeros(ix*10,3)
        const containerPath = path.join(portPath,key + " "+container.name)
        const needsPath = path.join(containerPath,"needs")
        const producesPath = path.join(containerPath,"produces")
        fs.mkdirSync(containerPath,{recursive:true})
        fs.mkdirSync(needsPath,{recursive:true})
        fs.mkdirSync(producesPath,{recursive:true})

        fs.writeFileSync(path.join(containerPath,"run.ps1"),container.script)
        container.needs?.forEach((artifact,ix)=>{
            const key = padWithLeadingZeros(ix*10,3)
            const artifactPath = path.join(needsPath,key + " " + artifact.split(" ")[0])
            fs.mkdirSync(artifactPath,{recursive:true})
            fs.writeFileSync(path.join(artifactPath,"item.txt"),artifact)
           // fs.writeFileSync(path.join(artifactPath,"artifact.yaml"),yaml.dump(artifact))
        })
        container.produces?.forEach((artifact,ix)=>{
            const key = padWithLeadingZeros(ix*10,3)
            const artifactPath = path.join(producesPath,key + " " + artifact.split(" ")[0])
            fs.mkdirSync(artifactPath,{recursive:true})
            fs.writeFileSync(path.join(artifactPath,"item.txt"),artifact)

            //  fs.writeFileSync(path.join(artifactPath,"artifact.yaml"),yaml.dump(artifact))
        })
    })
 })
}