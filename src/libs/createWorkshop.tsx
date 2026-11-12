import { BACKEND_URL, handleResponse } from "./config"
import { WorkshopInput } from "../../interfaces"
export default async function createWorkshop({token,workshop}:
    {token:string,workshop:WorkshopInput}) {
    const response = await fetch(`${BACKEND_URL}/api/v1/workshops`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workshop),
    })
    return await handleResponse(response, "Failed to create workshop")
}