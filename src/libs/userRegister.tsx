import { BACKEND_URL, handleResponse } from "./config"

export default async function userRegister(user: {
    name: string, email: string, tel: string, role: string, password: string
}) {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    return await handleResponse(response, "Failed to register")
}
