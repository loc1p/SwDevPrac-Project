import { BACKEND_URL, handleResponse } from "./config"

export default async function updateRegistration(token: string, id: string, workshopId: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/registrations/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ workshop: workshopId }),
    })
    return await handleResponse(response, "Failed to update registration")
}
