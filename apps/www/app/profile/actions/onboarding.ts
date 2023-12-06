"use server";

import { Result } from "@/lib/httphelper";
import { connect } from "@/lib/mongodb";
import { getSpAuthToken } from "@/lib/officegraph";
import { getUserSession } from "@/lib/user";
import { https } from "@/lib/httphelper";
import { logMagicpot } from "@/lib/magicpot";
import { InvitationResult } from "./InvitationResult";
import { ItemHeader } from "../data/sharepoint";
export interface CreateInvitationResult {

    user: GetAccountByEmailResult | null
    isNew: boolean
    //mongoid: string
    invitation: InvitationResult | null
    valid: boolean
    guideHTML?: string
}

export async function createInvitation(data: any): Promise<Result<CreateInvitationResult>> {


    const token = await getSpAuthToken()

    let user: GetAccountByEmailResult | null = null
    let result: Result<CreateInvitationResult> = { hasError: true, errorMessage: "unknown error" }
    const graphData = await getAccountByEmail(token, data.email)
    if (!graphData.hasError) {
        if (graphData.data && graphData.data.value && graphData.data.value.length > 0) {
            user = graphData.data.value[0]

        }
    } else {
        await logMagicpot("Profile", "createInvitation", { status: "Cannot get user from graph", data, graphData, user })
        result = { hasError: true, errorMessage: graphData.errorMessage }
        return result
    }


    let invitationResult = null


    if (!user) {
        const validGuestDomains = (await getValidGuestDomains(token)) ?? []

        const domain = data.email.split("@")[1]?.toLowerCase()

        const validGuestDomain = validGuestDomains.find((domainItem) => domainItem.Title.toLowerCase() === domain)
        if (!validGuestDomain) {
            result = { hasError: true, errorMessage: `You cannot login with that email address (domain @${domain})` }
            return result
        }

        invitationResult = await inviteGuestUser(token, data.email)

        if (invitationResult.hasError) {
            await logMagicpot("Profile", "createInvitation", { status: "Cannot create guest invitation", data, graphData, invitationResult, user })
            result = { hasError: true, errorMessage: invitationResult.errorMessage }
            return result
        }
        result = {
            hasError: false, data: {
                guideHTML: validGuestDomain.SigninGuide,
                user,
                valid: false,
                isNew:  true ,
                invitation: invitationResult?.data ? invitationResult.data : null

            }
        }
    }else{


    result = {
        hasError: false, data: {
            user,
            isNew: false,
            valid: true,
            invitation: null


        }
    }}
    await logMagicpot("Profile", "createInvitation", { status: "OK", data, graphData, invitationResult, user })


    return result
}
export interface Root<T> {
    "@odata.context": string;
    "@odata.count": number;
    "@microsoft.graph.tips": string;
    value: T[];
}

export interface GetAccountByEmailResult {

    displayName: string;
    userType: string;
    mail: string;
    userPrincipalName: string;
    externalUserState: string;
    id: string;
}


export async function getAccountByEmail(accessToken: string, email: string) {
    return await https<Root<GetAccountByEmailResult>>(accessToken, "GET",
        `https://graph.microsoft.com/v1.0/users?$filter=endsWith(mail,'${email}')&$count=true&$select=userType,displayName,mail,userPrincipalName,externalUserState`);

}

export async function inviteGuestUser(accessToken: string, email: string) {
    return await https<InvitationResult>(accessToken, "POST",
        `https://graph.microsoft.com/v1.0/invitations`, {
        "invitedUserEmailAddress": email,
        "inviteRedirectUrl": "https://home.nexi-intra.com/profile"
    });

}
//SigninGuide


export interface ValidGuestDomainItem {
    "@odata.etag": string
    createdDateTime: string
    eTag: string
    id: string
    lastModifiedDateTime: string
    webUrl: string
    createdBy: CreatedBy
    lastModifiedBy: LastModifiedBy
    parentReference: ParentReference
    contentType: ContentType
    "fields@odata.context": string
    fields: ValidGuestDomainFields
}

export interface CreatedBy {
    user: User
}

export interface User {
    email: string
    id: string
    displayName: string
}

export interface LastModifiedBy {
    user: User2
}

export interface User2 {
    email: string
    id: string
    displayName: string
}

export interface ParentReference {
    id: string
    siteId: string
}

export interface ContentType {
    id: string
    name: string
}

export interface ValidGuestDomainFields {
    "@odata.etag": string
    Title: string
    LinkTitle: string
    RedirectTo: string
    SigninGuide?: string
    id: string
    ContentType: string
    Modified: string
    Created: string
    AuthorLookupId: string
    EditorLookupId: string
    _UIVersionString: string
    Attachments: boolean
    Edit: string
    LinkTitleNoMenu: string
    ItemChildCount: string
    FolderChildCount: string
    _ComplianceFlags: string
    _ComplianceTag: string
    _ComplianceTagWrittenTime: string
    _ComplianceTagUserId: string
    _IsRecord: string
}


export async function getValidGuestDomains(accessToken: string) {
    const items = await https<Root<ItemHeader<ValidGuestDomainFields>>>(accessToken, "GET",
        `https://graph.microsoft.com/v1.0/sites/365adm.sharepoint.com:/sites/365admin:/lists/Valid Guest Domains/items?$expand=fields`);
    const guestDomains = items.data?.value.map((item) => {
        const { fields } = item;


        return fields;
    })
    return guestDomains
}
