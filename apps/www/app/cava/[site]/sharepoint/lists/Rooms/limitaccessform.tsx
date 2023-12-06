


"use client"
import * as React from "react"

import { useContext, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import * as z from "zod"

import { schema, ItemType } from "."
import { IProgressProps, ProcessStatusOverlay } from "@/components/progress"


import {
	Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/registry/new-york/ui/form"

import { Input } from "@/registry/new-york/ui/input"
import { Button } from "@/registry/new-york/ui/button"
import { Textarea } from "@/registry/default/ui/textarea"
import { ExchangeRoomStatus, getExchangeRoomStatus, updateWhocanBook } from "./server"
import { set } from "date-fns"
import { redirect } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Switch } from "@/registry/new-york/ui/switch"
import { Label } from "@/registry/new-york/ui/label"
import { MagicboxContext } from "@/app/magicbox-context"
import { useToast } from "@/registry/default/ui/use-toast"
import { CavaContext } from "../../../cavacontext"


export function LimitAccessToRoomForm(props: { site: string,item?: ItemType, backPath?: string }) {
	const {toast} = useToast()
	const {hasRole} =  useContext(CavaContext) 

	const magicbox = useContext(MagicboxContext)
	const { item,site } = props
	const [processing, setProcessing] = useState(false)
	const [processPercentage, setProcessPercentage] = useState(0)
	const [processTitle, setProcessTitle] = useState("")
	const [processDescription, setProcessDescription] = useState("")
	const [lastResult, setlastResult] = useState<any>()

	const [isbookingrestricted, setisbookingrestricted] = useState(false)

	const [roomstatus, setroomstatus] = useState<ExchangeRoomStatus>()
	const defaultValues: Partial<ItemType> = props.item ?? {}
	const form = useForm<ItemType>({
		resolver: zodResolver(schema),
		defaultValues,
		mode: "onChange",
	})

	async function onSubmit(data: ItemType) {
		
	
		setProcessTitle("Updating Room")
		setProcessDescription("Please wait while your request is processed in Microsoft 365")
		setProcessPercentage(0)
		setProcessing(true)
		const { script, result } = await updateWhocanBook(magicbox.session?.accessToken ??"unknown", site,isbookingrestricted, data)
		setProcessPercentage(100)
		if (result.hasError) {
			alert(result.errorMessage + "/n/n" + script)
		} else {
			toast({
				title: "Room updated",
				
			   variant: "default"
			 })
		}
		setProcessing(false)


	}


	useEffect(() => {
		if (item) {
			form.reset(item)
			setisbookingrestricted(item?.RestrictedTo ? true : false)
			

		}
	}, [form, item])



	return (
		<div>

			<div className="ml-5 flex">
				<Form {...form}>

					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="Email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="" {...field} disabled value={field.value ?? ""} />
									</FormControl>
									<FormDescription>

									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField

							control={form.control}
							name="RestrictedTo"
							render={({ field }) => (
								<FormItem >
									<FormLabel><div className="flex items-center space-x-2">
										<Label htmlFor="airplane-mode">Booking Restricted</Label>
										<Switch id="airplane-mode" onCheckedChange={() => { setisbookingrestricted(!isbookingrestricted) }} checked={isbookingrestricted} />

									</div>
									</FormLabel>
									<FormControl>
										<div style={{display:isbookingrestricted?"block":"none"}}>

										
												<div className="flex">
													<Textarea disabled={!isbookingrestricted} placeholder="Enter a comma seperated list of email addressses who should be allowed to book this room" {...field} value={field.value ?? ""} className="h-[200px] w-[400px]" />
													<div>
														<div>
															<Button onClick={(e) => form.setValue("RestrictedTo", form.getValues("RestrictedTo").replaceAll(",", "\n"))} variant={"link"} type="button" className="text-sm">Split</Button>
															<Button onClick={(e) => form.setValue("RestrictedTo", form.getValues("RestrictedTo").replaceAll("\n", ","))} variant={"link"} type="button" className="text-sm">Join</Button>
														</div>
													</div>
												</div>
										</div>
									</FormControl>
									<FormDescription>

									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"

						>
							Update Microsoft 365
						</Button>
						{props.backPath &&
							<Button className="ml-3" type="button" variant="secondary" ><Link href={props.backPath}> Back</Link></Button>}
						{hasRole("role.admin.rooms.all") && 	
							<Button className="ml-3" type="button" variant="secondary" onClick={async ()=>{
								
								
								const {result} = await getExchangeRoomStatus(form.getValues("Email"))
								
								setroomstatus(result.data)
								}} >Get status</Button>}
					</form>
				</Form>

				<ProcessStatusOverlay hideProgress
					done={!processing}
					title={processTitle}
					description={processDescription}
					progress={processPercentage}
				/>

			</div>
			<pre>
				{JSON.stringify(roomstatus, null, 2)}

			</pre>
		</div>
	)


}










