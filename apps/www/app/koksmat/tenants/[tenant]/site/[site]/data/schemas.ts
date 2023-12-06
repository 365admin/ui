

import { z } from "zod";







export const cateringProviderSchema = z.object({
  id:z.string(),
  name:z.string(),
  email:z.string().email(),
 
});

export type CateringProvider = z.infer<typeof cateringProviderSchema>;


export const companyProviderSchema = z.object({
  id:z.string(),
 
});

export type Company = z.infer<typeof companyProviderSchema>;


export const itemGroupSchema = z.object({
  id:z.string(),
  name:z.string(),
  sortOrder:z.number(),
});

export type ItemGroup = z.infer<typeof itemGroupSchema>;

export const workorderSchema = z.object({
  id:z.string(),
  name:z.string(),
  deliveryDateTime : z.date(),
  hour: z.number(),
  minute:z.number(),
 
});

export type WorkOrder = z.infer<typeof workorderSchema>;




export const countrySchema = z.object({
  id:z.string(),


})
export type Country = z.infer<typeof countrySchema>;



export const currencySchema = z.object({
  id:z.string(),
  name:z.string(),
  rate:z.number(),  

})
export type Currency = z.infer<typeof currencySchema>;


export const itemSchema = z.object({ 
  id:z.string(),
  name:z.string(),
  providerId : z.string(),
  provider : cateringProviderSchema,
  currency : currencySchema,
  itemGroups : itemGroupSchema.array(),
  description: z.string(),
  price: z.number(),
  comments:z.string(),
  imageUrl:z.string(),


})
export type Item = z.infer<typeof itemSchema>;



export const orderItem = z.object({
  id:z.string(),
  item : itemSchema,
  quantity : z.number(),
  price : z.number(),
  comments : z.string().optional(),
  deliveryHour: z.number(),
  deliveryMinute: z.number(),
 
  
});


export const roomSchema = z.object({
  id:z.string(),
  email:z.string().email(),
  name:z.string(),



})
export type Room = z.infer<typeof roomSchema>;

export type OrderItem = z.infer<typeof orderItem>;

export const orderSchema = z.object({
  id:z.string(),
  items : orderItem.array(),
  stage: z.string().optional(),
  deliverTo : roomSchema,
  deliveryDateTime : z.date(),
  hour: z.number(),
  minute:z.number(),
  organizer : z.string().email(),
  comments : z.string().optional(),
  costCentre: z.string().optional(),  
  orderData : z.string().optional(),
});


export type Order = z.infer<typeof orderSchema>;
export const workorderItemSchema = z.object({
  id:z.string(),
  dateToDeliver : z.date(),
  role:z.string(),
  order:orderSchema,
  item : itemSchema,
  quantity : z.number(),
  price : z.number(),
  comments : z.string().optional(),
  deliveryHour: z.number(),
  deliveryMinute: z.number(),
 
});

export type WorkorderItem = z.infer<typeof workorderItemSchema>;



export const locationSchema = z.object({
  id:z.string(),
  
  name:z.string(),



})
export type Location = z.infer<typeof locationSchema>;