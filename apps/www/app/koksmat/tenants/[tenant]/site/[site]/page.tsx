"use client"

import { useContext, useEffect, useState } from "react"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { MagicboxContext } from "../../../../../magicbox-context"
import { KoksmatContext } from "@/app/koksmat/context"
import { getCavaOrders } from "./data"
import { roles } from "./data/roles"
import { PageContextHeader } from "./components/page-context-header"


export default function Cava() {

  const {tenant,site} = useContext(KoksmatContext)

  return (
    <div className="minh-screen w-full">

      
      <div className="container ">
        
      <PageContextHeader title="The Bridge"  />
        <div className="flex flex-wrap">
          {roles(tenant,site)
            .filter((r) => r.type === "service")
            .map((service) => {
              return (
                <Card className="m-5 w-[350px]" key={service.key}>
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription className="h-[40px]">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="center">
                    <Image
                      src={service.image}
                      width={500}
                      height={500}
                      alt={service.name}
                      className="rounded-md"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="grow"></div>
                    <Button disabled={service.version === "draft"}>
                      <Link href={service.link}>
                        {service.linkname ?? "Start"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
        </div>
        <h2 className={"my-3 text-2xl font-bold leading-none tracking-tight"}>
          Application Roles
        </h2>
        <div className="flex flex-wrap">
          {roles(tenant,site)
            .filter((r) => r.type === "core")
            .map((role) => {
              return (
                <Card className="m-5 w-[350px]" key={role.key}>
                  <CardHeader>
                    <CardTitle>{role.name}</CardTitle>
                    <CardDescription className="h-[40px]">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="center">
                    <Image
                      src={role.image}
                      width={500}
                      height={500}
                      alt={role.name}
                      className="rounded-md"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="grow"></div>
                    <Button disabled={role.version === "draft"}>
                      <Link href={role.link}>{role.name} role</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
        </div>
        <h2 className={"my-3 text-2xl font-bold leading-none tracking-tight"}>
          Supporting Roles
        </h2>
        <div className="flex flex-wrap">
          {roles(tenant,site)
            .filter((r) => r.type === "supporting")
            .map((role) => {
              return (
                <Card className="m-5 w-[250px]" key={role.key}>
                  <CardHeader>
                    <CardTitle>{role.name}</CardTitle>
                    <CardDescription className="h-[40px]">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={role.image}
                      width={500}
                      height={500}
                      alt={role.name}
                      className="rounded-md"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="grow"></div>
                    <Button disabled={role.version === "draft"}>
                      <Link href={role.link}>View</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
        </div>
      </div>
    </div>
  )
}
