import { Metadata } from "next"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Overview } from "@/components/overview"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import LightBulb from "@/components/light-bulb-toggle"
import Fan from "@/components/fan"
import { DropletIcon, SunMediumIcon, ThermometerIcon } from "lucide-react"
import Bulb from "@/components/bulb"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "My dashboard"
}

export default function DashboardPage() {
  return (
    <>
      <div className="flex-col flex">
        {/* <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              {new Date().toLocaleString()}
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </div> */}
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
                    <div className="text-2xl font-bold">30°C</div>
                    <p className="text-xs text-muted-foreground">
                      Hot
                    </p>
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
                      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs font-medium text-center p-0.5 leading-none rounded-full dark:bg-red-500" style={{ width: "30%" }}>30°C</div>
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
                    <div className="text-2xl font-bold">40%</div>
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
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-xs font-medium text-center p-0.5 leading-none rounded-full" style={{ width: "40%" }}>40%</div>
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
                      Lux
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1000Lx</div>
                  </CardContent>
                </div>
                <div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle />
                    <SunMediumIcon className="h-4 w-4 text-muted-foreground hidden md:block" />
                  </CardHeader>
                  <CardContent>
                    <div className="mb-1 text-base font-medium text-yellow-700 dark:text-yellow-500">Lux</div>
                    <div className="w-full bg-gray-200 rounded-full mb-4 dark:bg-gray-700">
                      <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-xs font-medium text-center p-0.5 leading-none rounded-full" style={{ width: "50%" }}>1000</div>
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
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-4 lg:col-span-2">
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