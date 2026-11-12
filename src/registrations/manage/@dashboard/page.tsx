import {getServerSession} from 'next-auth'
import {authOptions} from "@/libs/authOptions"
import getUserProfile from '@/libs/getUserProfile'

export default async function DashboardPage(){
    const session =  await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    const profile = await getUserProfile(session.user.token)
    const createAt = new Date(profile.data.createdAt)

    return(
        <main className="bg-slate-100 m-5 p-5 rounded">
            <div className='text-2xl'>
                {profile.data.name}
            </div>
            <table className="table-auto border-separate border-spacing-2">
                <tbody>
                    <tr><td>Email</td><td>{profile.data.email}</td></tr>
                    <tr><td>Tel</td><td>{profile.data.tel}</td></tr>
                    <tr><td>Role</td><td>{profile.data.role}</td></tr>
                    <tr><td>Member Since</td><td>{createAt.toLocaleString("en-GB")}</td></tr>
                </tbody>
            </table>
        </main>
    )
}
