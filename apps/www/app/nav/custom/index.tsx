import { customComponentKey } from "..";
import {default as cava} from "./cava"

import {default as icing} from "./icing"

export default function getCustomization(journey:string,slug:string)
{

    const key = customComponentKey(slug) ?? ""
    
    switch (journey) {
        case "cava":
            return cava(key)
            break;
            case "icing":
                return icing(key)
                break;    
        default:
            return null
            break;
    }
}
//   