"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"


interface TimeRange {
    from: string,
    to: string
}

interface DateTimePickerProps {
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
    time: TimeRange;
    setTime: (time: TimeRange) => void;
}

export function CalendarDateRangePicker(
    { date, setDate, time, setTime }: DateTimePickerProps,
) {

    const handleTimeFromChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.target;
        setTime({
            from: value,
            to: time?.to
        })
    };
    const handleTimeToChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.target;
        setTime({
            from: time.from,
            to: value
        })
    };


    return (
        <div className={cn("grid gap-2")}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[260px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, ")} {time.from} -{" "}
                                    {format(date.to, "LLL dd, ")} {time.to}
                                    {/* {format(date.to, "dd/MM/yy HH:mm")} */}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Select
                        onValueChange={(value: any) =>
                            setDate({ from: addDays(new Date(), -parseInt(value)), to: new Date() })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="0">Today</SelectItem>
                            <SelectItem value="1">1 day ago</SelectItem>
                            <SelectItem value="3">3 days ago</SelectItem>
                            <SelectItem value="7">1 week ago</SelectItem>
                        </SelectContent>
                    </Select>
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        disabled={(date) =>
                            date > addDays(new Date(), 1) || date < new Date("1900-01-01")
                        }
                    />
                    <div className="flex">
                        <div className="px-4 pt-0 pb-4 w-1/2">
                            <Input
                                type="time"
                                onChange={handleTimeFromChange}
                                value={time.from}
                            />
                        </div>
                        <div className="px-4 pt-0 pb-4 w-1/2">
                            <Input
                                type="time"
                                onChange={handleTimeToChange}
                                value={time.to}
                            />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}