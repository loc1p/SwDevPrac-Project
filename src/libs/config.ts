export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000"

// read the backend's { success:false, error } message and throw it
export async function handleResponse(response: Response, fallback: string) {
    const json = await response.json().catch(() => null)
    if (!response.ok) {
        throw new Error(json?.error || fallback)
    }
    return json
}

// workshopDate is stored as UTC midnight -> show it as a calendar date
export function formatWorkshopDate(date: string) {
    return new Date(date).toLocaleDateString("en-GB", {
        timeZone: "UTC", weekday: "short", day: "numeric", month: "short", year: "numeric",
    })
}

// YYYY-MM-DD of a workshopDate (UTC)
export function toDateString(date: string) {
    return new Date(date).toISOString().slice(0, 10)
}

// pick one of the placeholder pictures for a workshop (backend has no image field)
export function getWorkshopImage(id: string) {
    let sum = 0
    for (const ch of id) sum += ch.charCodeAt(0)
    return `/img/workshop${(sum % 4) + 1}.svg`
}
