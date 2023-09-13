"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Overview } from "@/components/overview"
import LightBulb from "@/components/light-bulb-toggle"
import Fan from "@/components/fan"
import { DropletIcon, SunMediumIcon, ThermometerIcon } from "lucide-react"
import { getCurrentSensorVal } from "@/connections/mqtt"
import axios from "axios";
import { useEffect, useState } from "react"

export default function HomePage() {
    const sensorVal = getCurrentSensorVal()
    const [dataChart, setDataChart] = useState<any>([])
    useEffect(() => {
        axios.get("http://localhost:5678/api/lastest_sensors")
            .then(res => setDataChart(res.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        setDataChart((preData: any) => {
            if (preData.length > 10) {
                preData.splice(0, 1)
            }
            return [...preData, sensorVal]
        });
    }, [sensorVal])

    return (
        <>
            <div className="flex-col flex">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <div className="grid sm:grid-cols-2">
                                <div>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Temperature
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{sensorVal.temperature}°C</div>
                                        {/* <p className="text-xs text-muted-foreground">
                                            Hot
                                        </p> */}
                                    </CardContent>
                                </div>
                                <div>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle />
                                        <ThermometerIcon className="h-4 w-4 text-muted-foreground hidden md:block" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-1 text-base font-medium text-red-700 dark:text-red-500">Thermometer</div>
                                        <div className="w-full bg-gray-200 rounded-full mb-4 dark:bg-gray-700">
                                            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs font-medium text-center p-0.5 leading-none rounded-full dark:bg-red-500" style={{ width: `${sensorVal.temperature * 100 / 50}%` }}>{sensorVal.temperature}°C</div>
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className="grid sm:grid-cols-2">
                                <div>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Humidity
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{sensorVal.humidity}%</div>
                                    </CardContent>
                                </div>
                                <div>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle />
                                        <DropletIcon className="h-4 w-4 text-muted-foreground hidden md:block" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-1 text-base font-medium text-blue-700 dark:text-blue-500">Hygrometer</div>
                                        <div className="w-full bg-gray-200 rounded-full mb-4 dark:bg-gray-700">
                                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-xs font-medium text-center p-0.5 leading-none rounded-full" style={{ width: `${sensorVal.humidity}%` }}>{sensorVal.humidity}%</div>
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className="grid sm:grid-cols-2">
                                <div>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Light
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{sensorVal.light}Lx</div>
                                    </CardContent>
                                </div>
                                <div>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle />
                                        <SunMediumIcon className="h-4 w-4 text-muted-foreground hidden md:block" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-1 text-base font-medium text-yellow-700 dark:text-yellow-500">Light</div>
                                        <div className="w-full bg-gray-200 rounded-full mb-4 dark:bg-gray-700">
                                            <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-xs font-medium text-center p-0.5 leading-none rounded-full" style={{ width: `${sensorVal.light}%` }}>{sensorVal.light ? sensorVal.light : "Lx"}</div>
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-8">
                        <Card className="col-span-6">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Overview data={dataChart}/>
                            </CardContent>
                        </Card>
                        <Card className="col-span-6 lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Active</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <LightBulb />
                                <div className="py-3" />
                                <Fan />
                            </CardContent>
                        </Card>
                        {/* <Card className="col-span-4 lg:col-span-2">
              <CardHeader>
                <CardTitle>Warning</CardTitle>
              </CardHeader>
              <CardContent>
                <Bulb />
                <div className="py-3" />
                <Bulb />
              </CardContent>
            </Card> */}
                    </div>
                </div>
            </div>
        </>
    )
}

  // const [data, setData] = useState<any>([])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     var newData = {
  //       temperature: 0,
  //       humidity: 0,
  //       light: 0
  //     }
  //     newData.temperature = Number((Math.random() * (40.50 - 20.20) + 20.20).toFixed(2))
  //     newData.humidity = Number((Math.random() * (90.50 - 70.02) + 70.02).toFixed(2))
  //     newData.light = Number((Math.random() * (100 - 50) + 50).toFixed(0))

  //     setData((preData: any) => {
  //       if (preData.length > 10) {
  //         preData.splice(0, 1)
  //       }
  //       console.log(newData)
  //       return [...preData, newData]
  //     });
  //   }, 2000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // })