import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/authOptions"
import getWorkshops from "@/libs/getWorkshops"
import getRegistrations from "@/libs/getRegistrations"
import { buildDashboardStats } from "@/libs/dashboardStats"
import StatCard from "@/components/StatCard"
import WorkshopFillTable from "@/components/WorkshopFillTable"

export default async function DashboardPage(){
    const session = await getServerSession(authOptions)
    if(session?.user.role!=='admin'){
        return <main className="text-center p-5 text-red-600">Only admin can view the dashboard</main>
    }

    let stats
    try {
        const [workshopJson,registrationJson] = await Promise.all([
            getWorkshops(), getRegistrations(session.user.token)])
        stats = buildDashboardStats(workshopJson.data, registrationJson.data)
    } catch (err) {
        return <main className="text-center p-5 text-red-600">Cannot load dashboard: {(err as Error).message}</main>
    }
    const seatPercent = stats.totalCapacity ? Math.round(stats.seatsTaken/stats.totalCapacity*100) : 0

    return(
        <main className="p-5 max-w-6xl mx-auto w-full space-y-5">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-xl font-medium">Admin Dashboard</h1>
                <Link href="/workshop/new">
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white">Add Workshop</button>
                </Link>
            </div>

            <div className="flex flex-row flex-wrap gap-4">
                <StatCard title="Upcoming Workshops" value={stats.upcomingWorkshops}
                    detail={`${stats.workshopsThisWeek} in the next 7 days · ${stats.totalWorkshops} listed`}/>
                <StatCard title="Active Registrations" value={stats.activeRegistrations}
                    detail={`${stats.totalRegistrations} in total (incl. past & removed)`}/>
                <StatCard title="Seats Taken" value={`${seatPercent}%`}
                    detail={`${stats.seatsTaken} of ${stats.totalCapacity} upcoming seats`}/>
                <StatCard title="Full Workshops" value={stats.fullWorkshops}
                    detail={stats.members===1? "1 member has registered" : `${stats.members} members have registered`}/>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="text-lg font-medium mb-2">Workshop Fill Rate</div>
                <WorkshopFillTable fills={stats.fills}/>
            </div>
        </main>
    )
}
