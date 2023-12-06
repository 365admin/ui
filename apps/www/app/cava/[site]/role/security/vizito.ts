/* eslint-disable turbo/no-undeclared-env-vars */
"use server"
export interface Visitors {
  total: number
  visitors: Visitor[]
}

export interface Visitor {
  _id: string
  visit_type: string
  proofofidentity: string
  first_name: string
  last_name: string
  recipient: string
  company: string
  guestcardnumber: string
  reason: string
  registeredbynameofreceptionistsecurityguard: string
  company_id: string
  signed_in_source: string
  signed_in: string
  user_id: string
  mod_date: string
  signed_in_user: string
  __v: number
  signed_out?: string
  signed_out_source?: string
  signed_out_user?: string
  recipient_mail?: string
}

export async function getVisitors(companyId : string): Promise<Visitor[]> {

  const url = `https://backoffice.vizito.be/api/visitors/bycompany/${companyId}?count=100&filter[signed_out][endDate]=&filter[signed_out][startDate]=&page=1&sorting[signed_in]=desc`
  const response = await fetch(url, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "authorization": process.env.VIZITO_AUTH ?? "",

    },
    "body": null,
    "method": "GET"
  });
  
  const text = await response.text()
  const visitors: Visitors = JSON.parse(text)
  return visitors.visitors



}

export interface Company {
  _id: string
  mod_date: string
  tier: string
  name: string
  pubsub: boolean
}

export async function getCompanies(){

  const response = await fetch("https://backoffice.vizito.be/api/companiesList", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "authorization": process.env.VIZITO_AUTH ?? "",
   
  },
  "body": null,
  "method": "GET"
});
const text = await response.text()
const companies: Company[] = JSON.parse(text)
return companies
}
