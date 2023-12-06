import { AzContext, AzDomain } from "./az-schema"
import { PowerShell } from "./powershell"
export function AzureDomain(props: {
  onData?: (data: AzDomain.Root) => void
  onError?: (errorMessage: string) => void
}) {
  return (
    <PowerShell<AzDomain.Root>
    script={`
    Get-AzDomain | ConvertTo-Json
    `}
    onData={props.onData}
    onError={props.onError}
    />
  )
}
