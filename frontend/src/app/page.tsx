import { Metadata } from "next"

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
import Bulb from "@/components/bulb"
import { getCurrentSensorVal } from "@/connections/mqtt"
import HomePage from "@/components/home-page"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "My dashboard"
}

export default function DashboardPage() {
  return (
    <>
      <HomePage />
    </>
  )
}