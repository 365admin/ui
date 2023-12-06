export type NavigationTrace = "none" | "error" | "warning" | "info" | "verbose" | "debug";
export const NavigationTraceNone = 0
export const NavigationTraceError = 1
export const NavigationTraceWarning = 2
export const NavigationTraceInfo = 3
export const NavigationTraceVerbose = 4
export const NavigationTraceDebug = 5
export type NavigationTraceLevel = number



export interface NavigationItemProps 
 {
    trace?: NavigationTraceLevel;
    traceLevel?: NavigationTraceLevel;
    name?: string;
}

export interface NavigationItemWithPositionProps extends NavigationItemProps  {
    row?: number;
    column?: number;
}

export interface Navigator {
   
    trace: NavigationTraceLevel;
    
}