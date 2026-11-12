import { BACKEND_URL, handleResponse } from "./config"

export default async function deleteRegistration(token: string, id: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/registrations/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
    })
    return await handleResponse(response, "Failed to delete registration")
}
