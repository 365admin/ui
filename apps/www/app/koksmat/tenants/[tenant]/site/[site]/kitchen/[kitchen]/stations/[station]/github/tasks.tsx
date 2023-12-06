"use client"
import { Badge } from "@/registry/new-york/ui/badge"
import { Button } from "@/registry/new-york/ui/button"

import { PopUp } from "../../../../../components/popup"


import React, { use, useEffect, useState } from "react"
import { set } from "date-fns"

import { useProcess } from "@/lib/useprocess"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type Root = GitHubTask[]

export interface GitHubTask {
  assignees: Assignee[]
  author: Author
  body: string
  closed: boolean
  closedAt: any
  comments: any[]
  createdAt: string
  id: string
  labels: Label[]
  number: number
  state: string
  title: string
  updatedAt: string
}

export interface Assignee {
  id: string
  login: string
  name: string
}

export interface Author {
  id: string
  is_bot: boolean
  login: string
  name: string
}

export interface Label {
  id: string
  name: string
  description: string
  color: string
}



function convert(data: string): Root | null {
  if (!data) return null
  return JSON.parse(data) as Root
}

export default function ListTasks(props:{cwd:string}) {
  const { isLoading, error, data } = useProcess(
    "gh",
    ["issue", "list", "--json","author,assignees,id,number,title,createdAt,updatedAt,closedAt,comments,closed,body,state,labels"],
    20,
    "echo",
    props.cwd
  )
  const [selectedTask, setselectedTask] = useState<GitHubTask>()
  const [showDetails, setshowDetails] = useState(false)

  useEffect(() => {
    if (selectedTask) {
    }
  }, [selectedTask])

  if (data) {
    console.log(data)
  }
  return (
    <div>
      {isLoading && <div>Loading...</div>}

      {error && <div className="text-red-700">{error}</div>}
      <div className=" items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-1 xl:grid-cols-1 ">
      
        {convert(data)?.map((task: GitHubTask) => (
            <Card key={task.id} >
              <CardHeader>
                <CardTitle className="text-2xl">{task.title}</CardTitle>
                <CardDescription>
                  <Badge
                    variant={
                      task.closed 
                        ? "default"
                        : "secondary"
                    }
                  >
                    {task.labels.map((label) => (label.name))}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <div className=" p-4">
                   {task.body}
                  </div>
                </p>
              </CardContent>
              <CardFooter>
                <p>
                  {" "}
                  <Button
                    onClick={() => {
                      setselectedTask(task)
                      setshowDetails(true)
                    }}
                  >
                    Details
                  </Button>
                </p>
              </CardFooter>
            </Card>
          ))}
      </div>
      <PopUp
        show={showDetails}
        onClose={() => setshowDetails(false)}
        title={selectedTask?.title ?? "Details"}
        description={""}
      ><pre>
        {JSON.stringify(selectedTask,null,2)}
        </pre>
      </PopUp>
    </div>
  )
}
