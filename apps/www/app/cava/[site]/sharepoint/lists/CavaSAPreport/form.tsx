

	
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
			name="field_0"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Dato </FormLabel>
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
			name="field_1"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Month</FormLabel>
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
			name="field_2"
			render={({ field }) => (
				<FormItem>
					<FormLabel>year</FormLabel>
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
			name="field_4"
			render={({ field }) => (
				<FormItem>
					<FormLabel>System </FormLabel>
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
			name="field_5"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Møde ID </FormLabel>
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
			name="field_6"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Costcenter </FormLabel>
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
			name="field_7"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Pris </FormLabel>
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
			name="field_8"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Levering/afhentning</FormLabel>
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
			name="field_9"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Total </FormLabel>
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
	
	
	
	
			
		



		
	