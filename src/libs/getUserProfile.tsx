import { BACKEND_URL, handleResponse } from "./config"

export default async function getUserProfile(token: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    })
    return await handleResponse(response, "Cannot get user profile")
}
