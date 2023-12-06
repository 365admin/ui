import { ReactElement } from "react";
import { NavigationItemProps } from "./elements";
import { Port} from "@/app/koksmat/navigator";
export interface WaypointsProps extends NavigationItemProps{
    children:ReactElement | ReactElement[]
}


export default function Comp(props:WaypointsProps){
    const {children} = props
    return <div>
  {children}

   
    </div>
}