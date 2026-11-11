import { BACKEND_URL, handleResponse } from "./config"

export default async function createRegistration(token: string, workshopId: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/registrations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ workshop: workshopId }),
    })
    return await handleResponse(response, "Failed to register for workshop")
}
