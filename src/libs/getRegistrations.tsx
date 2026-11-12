import { BACKEND_URL, handleResponse } from "./config"

export default async function getRegistrations(token: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/registrations`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
        cache: "no-store",
    })
    return await handleResponse(response, "Failed to fetch registrations")
}
