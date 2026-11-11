import { BACKEND_URL,handleResponse } from "./config";
export default async function getWorkshop(id:string){
    const response = await fetch(`${BACKEND_URL}/api/v1/workshops/${id}`,{cache:"no-store"})
    return await handleResponse(response,"Failed to fetch workshop")
}