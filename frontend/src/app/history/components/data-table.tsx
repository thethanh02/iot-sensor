"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SensorTable } from "./sensor-table"
import { ActionTable } from "./action-table"

export function DataTableDemo() {
    return (
        <Tabs defaultValue="sensor" className="space-y-4 w-full">
            <TabsList>
                <TabsTrigger value="sensor">Sensor</TabsTrigger>
                <TabsTrigger value="action">Action</TabsTrigger>
            </TabsList>
            <TabsContent value="sensor">
                <SensorTable />
            </TabsContent>
            <TabsContent value="action">
                <ActionTable />
            </TabsContent>
        </Tabs>
    )
}
