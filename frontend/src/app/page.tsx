import { Metadata } from "next"

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