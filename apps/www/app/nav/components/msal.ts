import { Result, https } from "@/lib/httphelper";
import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";





export async function aquireToken (instance : IPublicClientApplication,account: AccountInfo,scopes:string[])  {
   

        try {
            const response = await instance.acquireTokenSilent({
                scopes,
                account: account,
              });
     
              let result : Result<string> = {
                hasError: false,
                data: response.accessToken
            }
              return result

        } catch (error) {
            try {
                const response = await instance.acquireTokenPopup({
                    scopes,
                    account: account,
                  });
                  let result : Result<string> = {
                    hasError: false,
                    data: response.accessToken
                }
                  return result
                  
            } catch (error) {
                const result : Result<any> = {
                    hasError: true,
                    errorMessage: error?.toString() ?? "unknow error"
                }
                return result
            }

           
              
        }

    

    
        
    }