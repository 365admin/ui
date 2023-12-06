
/* eslint-disable turbo/no-undeclared-env-vars */
import { https } from "@/lib/httphelper";
import { authenticate } from "@/services/koksmat/authenticate";




export async function invokeExchangePowerShell<T>(body: string) {

  const authResult = await authenticate()

  const accessToken = authResult.token ?? ""
  const endPoint = `${process.env.KOKSMAT_HOST}/v1/admin/powershell?host=exchange`

  const res = await https<T>(accessToken, "POST",
    endPoint, body);
  return res


}





