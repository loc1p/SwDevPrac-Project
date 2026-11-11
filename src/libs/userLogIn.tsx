import { BACKEND_URL } from "./config"

export default async function userLogin(userEmail: string, userPassword: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        }),
    })
    if (!response.ok) {
        return null   // wrong email / password -> sign-in fails
    }

    return await response.json();
}
