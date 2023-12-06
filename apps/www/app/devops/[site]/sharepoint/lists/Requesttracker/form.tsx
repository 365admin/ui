

	
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
			name="Estimated_x0020_hours_x0020_to_x"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Estimated hours to complete</FormLabel>
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
			name="Description"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Request description</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??""} />
					</FormControl>
					<FormDescription>
						Describe the issue
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Priority"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Priority</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??""}/>
					</FormControl>
					<FormDescription>
						Add the priority of this issue
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
						Status of the issue
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="Assignedto0"
			render={({ field }) => {
			
				return (
				<FormItem>
					<FormLabel>Assigned to</FormLabel>
					<FormControl>
						<Input placeholder="" {...field}  value={field.value??""}/>
					</FormControl>
					<FormDescription>
						Person or group the issue is assigned to
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}}
		/><FormField
			control={form.control}
			name="DateReported"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Date reported</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value?.toISOString()??""} />
					</FormControl>
					<FormDescription>
						The date the issue was reported
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="IssueSource"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Relevant link</FormLabel>
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
			name="Issueloggedby"
			render={({ field }) => {
			
				return (
				<FormItem>
					<FormLabel>Request logged by</FormLabel>
					<FormControl>
						<Input placeholder="" {...field}  value={field.value??""}/>
					</FormControl>
					<FormDescription>
						The person who logged the request
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}}
		/><FormField
			control={form.control}
			name="Archived"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Archived</FormLabel>
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
			name="SuggestedSolutions"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Suggested Solutions</FormLabel>
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
			name="PrioritySortOrder"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Priority Sort Order</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??""}/>
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
	
	
	
	
			
		



		
	