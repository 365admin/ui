"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface PropTypes {
  currentDate: Date
  onDateChanged: (date: Date) => void
}

export function DatePicker(props: PropTypes) {
  const [date, setDate] = React.useState<Date>(props.currentDate)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  React.useEffect(() => {
    props.onDateChanged(date)
  }, [date])

  return (
    <Popover open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          required
          selected={date}
          onSelect={(selected) => {
            setDate(selected ? selected : date); setIsOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
