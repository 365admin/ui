import { SeaViewProps } from "./seaviewprops";

export type Scope<C = any> = {
    [scopeName: string]: React.Context<C>[];
} | undefined;
type ScopedProps<P> = P & {
    __scopeMenubar?: Scope;
};
 interface ViewProps {
    match: string;
    value?: string;
    children?: React.ReactNode;
}

export default function SeaView(props: ScopedProps<ViewProps>): SeaViewProps{
const {children,value} = props
return (<div>
    {value}
{children}

</div>)
}
   