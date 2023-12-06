import { listTravelPlans } from "../components/server"

export default async function Page() {
    
const travelPlans = listTravelPlans("/Users/nielsgregersjohansen/code/koksmat/ui/apps/www/app/nav/travelplans")
return (<div>
Select a journey
{(await travelPlans).map((travelPlan) => {
return <div key={travelPlan}>
<a href={"./journey/"+travelPlan}>{travelPlan}</a>
</div>

})}
</div>)}