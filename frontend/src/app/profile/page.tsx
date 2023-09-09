import { Metadata } from "next"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const metadata: Metadata = {
    title: "Profile",
    description: "Profile",
}

export default async function TaskPage() {

    return (
        <div className="container md:w-3/5 lg:w-5/12">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="py-8">
                        <div className="grid sm:grid-cols-10">
                            <div className="col-span-3">
                                <Avatar className="w-full h-auto">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@thethanh02" />
                                    <AvatarFallback>TT</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="py-8 sm:py-0 px-8 col-span-7">
                                <p className="font-medium">Nguyễn Thế Thành</p>
                                <p className="font-medium py-3">24/08/2002</p>
                                <p className="font-medium">B20DCCN650</p>
                                <p className="font-medium py-3">D20CQCN02-B</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}