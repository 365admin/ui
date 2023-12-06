import { Plotter } from "..";
import { NavigationItemProps, NavigationItemWithPositionProps } from "./elements";

export interface ShipProps extends NavigationItemWithPositionProps{
shipName:string
}


export default function Comp(props:ShipProps){

    return <div>
        <Plotter typename={"Ship"} {...props} tag={props.shipName} />
 
   
    </div>
}