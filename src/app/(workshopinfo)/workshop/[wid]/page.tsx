import Link from "next/link";
import getWorkshop from "@/libs/getWorkshop"
import { formatWorkshopDate, toDateString } from "@/libs/config";
import WorkshopActions from "@/components/WorkshopActions";

export default async function WorkshopDetailPage({params}:{params:Promise<{wid:string}>}){
    const { wid } = await params
    let workshopDetail
    try {
        workshopDetail = await getWorkshop(wid)
    } catch (err) {
        return (
            <main className="text-center p-5">
                <div className="text-red-600">{(err as Error).message}</div>
                <Link href="/workshop" className="text-cyan-600 underline">Back to workshops</Link>
            </main>
        )
    }
    const workshop = workshopDetail.data
    const isPast = toDateString(workshop.workshopDate) < new Date().toISOString().slice(0,10)

    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">
                {workshop.name}
            </h1>
            <div className="flex flex-row my-5 text-left">
                <div className="text-md mx-5 space-y-1">
                    <div>{workshop.description}</div>
                    <div className="text-md">Instructor : {workshop.instructor}</div>
                    <div className="text-md">Date : {formatWorkshopDate(workshop.workshopDate)}</div>
                    <div className="text-md">Location : {workshop.location}</div>
                    <div className="text-md">Capacity : {workshop.capacity}</div>
                    <div className="text-xs text-gray-500">Workshop ID : {workshop._id}</div>
                    <WorkshopActions isPast={isPast} item={{
                        workshopId: workshop._id,
                        workshopName: workshop.name,
                        workshopDate: workshop.workshopDate,
                        location: workshop.location,
                        instructor: workshop.instructor,
                    }}/>
                </div>
            </div>
        </main>
    )
}
