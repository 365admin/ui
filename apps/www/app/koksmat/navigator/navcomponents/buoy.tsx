import { NavigationItemProps, NavigationItemWithPositionProps } from "./elements"
import Plotter from "./plotter"

export interface BuoyProps extends NavigationItemWithPositionProps {
 
}

export default function Buoy(props: BuoyProps) {
 
  return (
    <div>
 <Plotter typename={"Buoy"} {...props} tag={"Buoy"} description="A buoy is a floating device that can have many purposes. It can be anchored (stationary) or allowed to drift with ocean currents. "/>
    </div>
  )
}
