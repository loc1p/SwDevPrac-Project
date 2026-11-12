import {getServerSession} from 'next-auth'
import {authOptions} from "@/libs/authOptions"
import getRegistrations from '@/libs/getRegistrations'
import { RegistrationItem } from '../../../../../interfaces'

export default async function ManagePage(){
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    const registrationJson = await getRegistrations(session.user.token)
    const today = new Date().toISOString().slice(0,10)
    const active = registrationJson.data.filter((reg:RegistrationItem)=>
        reg.workshop && reg.workshop.isActive!==false && reg.workshop.workshopDate.slice(0,10) >= today)

    return(
        <main className="bg-slate-100 m-5 p-5 rounded">
            <div className='text-xl'>
                {session.user.role==='admin'? 'All Registrations' : 'Your Registrations'}
            </div>
            <div>Total registrations: {registrationJson.count}</div>
            <div>Active (upcoming) registrations: {active.length}
                {session.user.role==='admin'? '' : ` / 3 (${Math.max(0,3-active.length)} left)`}
            </div>
        </main>
    )
}
