import { Metadata } from "next"
import { DataTableDemo } from "./components/data-table"

export const metadata: Metadata = {
    title: "History",
    description: "History",
}

export default async function TaskPage() {

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <DataTableDemo />
        </div>
    )
}