import { BACKEND_URL, handleResponse } from "./config"

export default async function deleteWorkshop({token,id}:
    {token:string,id:string}) {
    const response = await fetch(`${BACKEND_URL}/api/v1/workshops/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    })
    return await handleResponse(response, "Failed to delete workshop")
}