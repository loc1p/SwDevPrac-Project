import { BACKEND_URL,handleResponse } from "./config"
export default async function getWorkshops(search?:string){
    // await new Promise((r) => setTimeout(r, 2000));
    const response = await fetch(`${BACKEND_URL}/api/v1/workshops?search=${search ?? ""}`,{cache:"no-store"})
    return await handleResponse(response,"Failed to fetch workshop")
}