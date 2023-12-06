import { ToolProps } from "../magicbox/components/tools";


export  const home = (link:string) : ToolProps => ({link,displayName:"Home",script:"",iconUrl:"",openIn:"Same page",noTopMargin:false,isLogo:false,standalone:false})

export async function koksmatTools():Promise<ToolProps[]>{
return [home("")]

}