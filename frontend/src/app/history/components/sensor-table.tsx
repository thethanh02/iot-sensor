"use client"

import * as React from "react"
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CalendarDateRangePicker } from "./date-range-picker"
import axios from "axios"
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import moment from "moment"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"


export type Sensor = {
    id: string
    light: number
    temperature: number
    humidity: number
    time: string
}

export const columns: ColumnDef<Sensor>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Id
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => (
            <div className="font-medium">{moment(row.getValue("time")).format('DD/MM/YY HH:mm:ss')}</div>
        ),
    },
    {
        accessorKey: "temperature",
        header: "Temperature(°C)",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("temperature")}</div>
        ),
    },
    {
        accessorKey: "humidity",
        header: "Humidity(%)",
        cell: ({ row }) => <div className="font-medium">{row.getValue("humidity")}</div>,
    },
    {
        accessorKey: "light",
        header: "Light(Lx)",
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("light")}</div>
        },
    }
]

interface TimeRange {
    from: string,
    to: string
}

export function SensorTable() {

    // Pagination handler
    const [currentPage, setCurrentPage] = React.useState(0)
    const [totalPages, setTotalPages] = React.useState(0)
    React.useEffect(() => {
        axios.get("http://localhost:5678/api/total_pages_sensors")
            .then(res => setTotalPages(res.data))
            .catch(err => console.log(err))
    }, [])
    const handleNextPage = async () => {
        if (date && currentPage < totalPages) {
            if (date.from && date.to) {
                await axios.get("http://localhost:5678/api/list_sensors", {
                    params: {
                        time_from: time.from,
                        time_to: time.to,
                        date_from: date.from,
                        date_to: date.to,
                        page: currentPage + 1
                    }
                }).then(res => {
                    setData(res.data)
                    setCurrentPage(currentPage + 1)
                }).catch(error => console.log(error))
            } else {
                await axios.get(`http://localhost:5678/api/list_sensors?page=${currentPage + 1}`
                ).then(res => {
                    setData(res.data)
                    setCurrentPage(currentPage + 1)
                }).catch(error => console.log(error))
            }
        }
    }
    const handlePrevPage = async () => {
        if (date && currentPage > 0) {
            if (date.from && date.to) {
                await axios.get("http://localhost:5678/api/list_sensors", {
                    params: {
                        time_from: time.from,
                        time_to: time.to,
                        date_from: date.from,
                        date_to: date.to,
                        page: currentPage - 1
                    }
                }).then(res => {
                    setData(res.data)
                    setCurrentPage(currentPage - 1)
                }).catch(error => console.log(error))
            } else {
                await axios.get(`http://localhost:5678/api/list_sensors?page=${currentPage - 1}`
                ).then(res => {
                    setData(res.data)
                    setCurrentPage(currentPage - 1)
                }).catch(error => console.log(error))
            }
        }
    }
    const handleLastPage = async () => {
        if (date && currentPage < totalPages) {
            if (date.from && date.to) {
                await axios.get("http://localhost:5678/api/list_sensors", {
                    params: {
                        time_from: time.from,
                        time_to: time.to,
                        date_from: date.from,
                        date_to: date.to,
                        page: totalPages
                    }
                }).then(res => {
                    setData(res.data)
                    setCurrentPage(totalPages)
                }).catch(error => console.log(error))
            } else {
                await axios.get(`http://localhost:5678/api/list_sensors?page=${totalPages}`
                ).then(res => {
                    setData(res.data)
                    setCurrentPage(totalPages)
                }).catch(error => console.log(error))
            }
        }
    }
    const handleFirstPage = async () => {
        if (date && currentPage > 0) {
            if (date.from && date.to) {
                await axios.get("http://localhost:5678/api/list_sensors", {
                    params: {
                        time_from: time.from,
                        time_to: time.to,
                        date_from: date.from,
                        date_to: date.to,
                        page: 0
                    }
                }).then(res => {
                    setData(res.data)
                    setCurrentPage(0)
                }).catch(error => console.log(error))
            } else {
                await axios.get("http://localhost:5678/api/list_sensors?page=0"
                ).then(res => {
                    setData(res.data)
                    setCurrentPage(0)
                }).catch(error => console.log(error))
            }
        }
    }

    // Data
    const [data, setData] = React.useState<Sensor[]>([])
    React.useEffect(() => {
        axios.get(`http://localhost:5678/api/list_sensors?page=${currentPage}`)
            .then(res => setData(res.data))
            .catch(error => console.log(error))
    }, [])

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnVisibility,
        },
    })

    // Date time handler
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: addDays(new Date(), -30),
        to: undefined,
    })
    const [time, setTime] = React.useState<TimeRange>({
        from: '00:00',
        to: '00:00'
    })
    const { toast } = useToast()
    const handleClickSearch = async () => {
        if (date && date.from && date.to) {
            await axios.get("http://localhost:5678/api/list_sensors", {
                params: {
                    time_from: time.from,
                    time_to: time.to,
                    date_from: date.from,
                    date_to: date.to,
                    page: 0
                }
            }).then(res => {
                setData(res.data)
                setCurrentPage(0)
            }).catch(error => console.log(error))

            await axios.get("http://localhost:5678/api/total_pages_sensors", {
                params: {
                    time_from: time.from,
                    time_to: time.to,
                    date_from: date.from,
                    date_to: date.to,
                }
            }).then(res => {
                setTotalPages(res.data)
            }).catch(error => console.log(error))
        } else {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "Please pick 2 dates, not 1",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    return (
        <>
            <div className="flex items-center py-4">
                <CalendarDateRangePicker date={date} setDate={setDate} time={time} setTime={setTime} />
                <Button variant="outline" size="icon" onClick={handleClickSearch}>
                    <Search className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto hidden md:flex">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {currentPage + 1} of{" "}
                    {totalPages + 1}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={handleFirstPage}
                        disabled={currentPage <= 0}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={handlePrevPage}
                        disabled={currentPage <= 0}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={handleLastPage}
                        disabled={currentPage >= totalPages}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    )
}