import { BACKEND_URL, handleResponse } from "./config"
import { WorkshopInput } from "../../interfaces"
export default async function updateWorkshop({token,id,workshop}:
    {token:string,id:string,workshop:WorkshopInput}) {
    const response = await fetch(`${BACKEND_URL}/api/v1/workshops/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workshop),
    })
    return await handleResponse(response, "Failed to update workshop")
}