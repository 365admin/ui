

	
	"use client"
	import * as React from "react"
	
	import { useEffect, useState } from "react"
	import { zodResolver } from "@hookform/resolvers/zod"
	
	import { useForm } from "react-hook-form"
	import * as z from "zod"
	
	import {schema,ItemType} from "."
	import { IProgressProps, ProcessStatusOverlay } from "@/components/progress"
	
	
	import {
		Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
	} from "@/registry/new-york/ui/form"
	
	import { Input } from "@/registry/new-york/ui/input"
	import { Button } from "@/registry/new-york/ui/button"
	
	export function ItemForm(props: { item?: ItemType }) {
		const {item} = props
		const [processing, setProcessing] = useState(false)
		const [processPercentage, setProcessPercentage] = useState(0)
		const [processTitle, setProcessTitle] = useState("")
		const [processDescription, setProcessDescription] = useState("")
		const [lastResult, setlastResult] = useState<any>()
	  
		
		const defaultValues: Partial<ItemType> = props.item ?? {}
		const form = useForm<ItemType>({
			resolver: zodResolver(schema),
			defaultValues,
			mode: "onChange",
		})
	
		async function onSubmit(data: ItemType) {
			setProcessTitle("Saving profile")
			setProcessDescription("Please wait while we save your profile.")
			setProcessPercentage(0)
			setProcessing(true)
	
	
		}
	
	
		useEffect(() => {
			if (item) {
				form.reset(item)
			}
		}, [form,item])
	
	
	
		return (
			<div>
		
			<div className="flex">
				<Form {...form}>
				
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField 
			control={form.control}
			name="Title"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Title</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} />
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="RoomEmail"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Room Email</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??"" }/>
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Appointmentstart"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Appointment start</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value?.toISOString()??""} />
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Appointmentend"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Appointment end</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value?.toISOString()??""} />
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="OrderData"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Order Data</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??""} />
					</FormControl>
					<FormDescription>
						ID of the Item 
Quantity
Price
Seconds from meeting start
Name of the item

					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Organizer_x0020_Email"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Organizer Email</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??"" }/>
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Appointmentdata"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Appointment data</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??""} />
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Status"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Status</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??""}/>
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Visitor_x0020_Registrations"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Visitor Registrations</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??""} />
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Equipment_x0020_Orders"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Equipment Orders</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??""} />
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Reference"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Reference</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??"" }/>
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Booking_x0020_Web_x0020_Link"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Booking Web Link</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??"" }/>
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Catering_x0020_order_x0020_refer"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Catering order reference</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??"" }/>
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Stage"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Stage</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??"" }/>
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Comments"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Comments</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??""} />
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Cost_x0020_Centre"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Cost Centre</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??"" }/>
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="ConfirmationHTML"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Confirmation HTML</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??""} />
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			  control={form.control}
			  name="Site"
			  render={({ field }) => (
				  <FormItem>
					  <FormLabel>Site</FormLabel>
					  <FormControl>
					  
						  <Input placeholder="" {...field} value={field.value? field.value?.LookupValue:""}/>
					  </FormControl>
					  <FormDescription>
						  
					  </FormDescription>
					  <FormMessage />
				  </FormItem>
			  )}
		  /><FormField
			  control={form.control}
			  name="Room"
			  render={({ field }) => (
				  <FormItem>
					  <FormLabel>Room</FormLabel>
					  <FormControl>
					  
						  <Input placeholder="" {...field} value={field.value? field.value?.LookupValue:""}/>
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
						Save
					  </Button>
					</form>
				</Form>
				
				<ProcessStatusOverlay
					done={!processing}
					title={processTitle}
					description={processDescription}
					progress={processPercentage}
				/>
	
			</div>
			</div>
		)
	
	
	}
	
	
	
	
			
		



		
	