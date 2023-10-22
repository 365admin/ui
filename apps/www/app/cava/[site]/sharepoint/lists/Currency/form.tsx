

	
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
			if (props.item) {
				form.reset(props.item)
			}
		}, [form,props.item])
	
	
	
		return (
			<div className="flex">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField 
			control={form.control}
			name="Id"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Id</FormLabel>
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
			name="CreatedBy"
			render={({ field }) => (
				<FormItem>
					<FormLabel>CreatedBy</FormLabel>
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
			name="Created"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Created</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value.toISOString()} />
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField 
			control={form.control}
			name="ModifiedBy"
			render={({ field }) => (
				<FormItem>
					<FormLabel>ModifiedBy</FormLabel>
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
			name="Modified"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Modified</FormLabel>
					<FormControl>
						<Input placeholder="" {...field} value={field.value.toISOString()} />
					</FormControl>
					<FormDescription>
						
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/><FormField
			control={form.control}
			name="EURrate"
			render={({ field }) => (
				<FormItem>
					<FormLabel>EUR rate</FormLabel>
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
			name="_ColorTag"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Color Tag</FormLabel>
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
				<pre className="max-w-[500px] overflow-auto">
				{JSON.stringify(form.getValues(), null, 2)}
			</pre>
				<ProcessStatusOverlay
					done={!processing}
					title={processTitle}
					description={processDescription}
					progress={processPercentage}
				/>
	
			</div>
		)
	
	
	}
	
	
	
	
			
		



		
	