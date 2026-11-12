import Link from "next/link"
import { FillStatus, WorkshopFill } from "@/libs/dashboardStats"
import { formatWorkshopDate } from "@/libs/config"

const badgeClass: Record<FillStatus, string> = {
    "Full": "bg-red-100 text-red-700",
    "Almost full": "bg-amber-100 text-amber-700",
    "Open": "bg-green-100 text-green-700",
    "Past": "bg-gray-200 text-gray-600",
}
const barClass: Record<FillStatus, string> = {
    "Full": "bg-red-500",
    "Almost full": "bg-amber-500",
    "Open": "bg-green-500",
    "Past": "bg-gray-400",
}

// one row per workshop: registered / capacity with a progress bar
export default function WorkshopFillTable({fills}:{fills:WorkshopFill[]}){
    if(fills.length===0) return <div className="text-gray-600">No workshops yet.</div>

    return(
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="text-gray-600 border-b">
                    <th className="py-2 pr-2">Workshop</th>
                    <th className="py-2 pr-2">Date</th>
                    <th className="py-2 pr-2 w-[35%]">Registered / Capacity</th>
                    <th className="py-2">Status</th>
                </tr>
            </thead>
            <tbody>
                {fills.map((fill)=>(
                    <tr key={fill.workshop._id} className="border-b last:border-0">
                        <td className="py-2 pr-2">
                            <Link href={`/workshop/${fill.workshop._id}`} className="text-cyan-700 hover:underline">
                                {fill.workshop.name}</Link>
                            <div className="text-xs text-gray-500">{fill.workshop.location}</div>
                        </td>
                        <td className="py-2 pr-2">{formatWorkshopDate(fill.workshop.workshopDate)}</td>
                        <td className="py-2 pr-2">
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-gray-200 rounded">
                                    <div className={`h-2 rounded ${barClass[fill.status]}`}
                                        style={{width:`${Math.min(fill.percent,100)}%`}}/>
                                </div>
                                <span className="w-[90px] text-right">
                                    {fill.registered}/{fill.workshop.capacity} ({fill.percent}%)</span>
                            </div>
                        </td>
                        <td className="py-2">
                            <span className={`px-2 py-0.5 rounded text-xs ${badgeClass[fill.status]}`}>{fill.status}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
