import { RegistrationItem, WorkshopItem } from "../../interfaces"
import { toDateString } from "./config"

export type FillStatus = "Full" | "Almost full" | "Open" | "Past"

export interface WorkshopFill {
    workshop: WorkshopItem
    registered: number
    percent: number
    status: FillStatus
}

export interface DashboardStats {
    totalWorkshops: number
    upcomingWorkshops: number
    workshopsThisWeek: number
    totalRegistrations: number
    activeRegistrations: number
    members: number
    fullWorkshops: number
    totalCapacity: number        // seats of upcoming workshops
    seatsTaken: number           // registrations on upcoming workshops
    fills: WorkshopFill[]
}

const ALMOST_FULL = 0.8

// build every number shown on the admin dashboard from the two backend lists
export function buildDashboardStats(workshops: WorkshopItem[], registrations: RegistrationItem[]): DashboardStats {
    const today = new Date().toISOString().slice(0, 10)
    const weekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

    // registrations per workshop id
    const countByWorkshop = new Map<string, number>()
    for (const reg of registrations) {
        if (!reg.workshop) continue
        countByWorkshop.set(reg.workshop._id, (countByWorkshop.get(reg.workshop._id) ?? 0) + 1)
    }

    const fills: WorkshopFill[] = workshops.map((workshop) => {
        const registered = countByWorkshop.get(workshop._id) ?? 0
        const ratio = registered / workshop.capacity
        const isPast = toDateString(workshop.workshopDate) < today
        const status: FillStatus = isPast ? "Past"
            : registered >= workshop.capacity ? "Full"
            : ratio >= ALMOST_FULL ? "Almost full"
            : "Open"
        return { workshop, registered, percent: Math.round(ratio * 100), status }
    })

    const upcoming = fills.filter((f) => f.status !== "Past")
    const activeIds = new Set(upcoming.map((f) => f.workshop._id))

    return {
        totalWorkshops: workshops.length,
        upcomingWorkshops: upcoming.length,
        workshopsThisWeek: upcoming.filter((f) => toDateString(f.workshop.workshopDate) <= weekLater).length,
        totalRegistrations: registrations.length,
        activeRegistrations: registrations.filter((r) => r.workshop && activeIds.has(r.workshop._id)).length,
        members: new Set(registrations.map((r) => r.user?._id).filter(Boolean)).size,
        fullWorkshops: upcoming.filter((f) => f.status === "Full").length,
        totalCapacity: upcoming.reduce((sum, f) => sum + f.workshop.capacity, 0),
        seatsTaken: upcoming.reduce((sum, f) => sum + f.registered, 0),
        fills,
    }
}
