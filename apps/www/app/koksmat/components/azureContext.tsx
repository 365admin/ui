import { AzContext } from "./az-schema"
import { PowerShell } from "./powershell"
export function AzureContext(props: {
  onData?: (data: AzContext.Root) => void
  onError?: (errorMessage: string) => void
}) {
  return (
    <PowerShell<AzContext.Root>
    script={`
    Get-AzContext | ConvertTo-Json
    `}
    onData={props.onData}
    onError={props.onError}
    />
  )
}
