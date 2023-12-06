

	
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
			name="Releasedatetime"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Release date & time</FormLabel>
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
			name="Linktopackage"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Link to package</FormLabel>
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
			name="Stage"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Stage</FormLabel>
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
			  name="Package"
			  render={({ field }) => (
				  <FormItem>
					  <FormLabel>Package</FormLabel>
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
			name="Accountable"
			render={({ field }) => {
			
				return (
				<FormItem>
					<FormLabel>Accountable</FormLabel>
					<FormControl>
						<Input placeholder="" {...field}  value={field.value??""}/>
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}}
		/><FormField
			control={form.control}
			name="Responsible"
			render={({ field }) => {
			
				return (
				<FormItem>
					<FormLabel>Responsible</FormLabel>
					<FormControl>
						<Input placeholder="" {...field}  value={field.value??""}/>
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}}
		/><FormField
			  control={form.control}
			  name="Test_x0020_Environment"
			  render={({ field }) => (
				  <FormItem>
					  <FormLabel>Test Environment</FormLabel>
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
			  name="Production_x0020_Environment"
			  render={({ field }) => (
				  <FormItem>
					  <FormLabel>Production Environment</FormLabel>
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
			name="Testplan"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Test plan</FormLabel>
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
			name="Sign_x002d_off_x0020_status"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Sign-off status</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value??"" }/>
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
	
	
	
	
			
		



		
	