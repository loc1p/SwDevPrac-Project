"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { LinearProgress } from "@mui/material"
import getRegistrations from "@/libs/getRegistrations"
import deleteRegistration from "@/libs/deleteRegistration"
import { RegistrationItem } from "../../interfaces"

// admin only: who registered for this workshop, with a delete button per registration
// the backend has no per-workshop endpoint, so we load every registration and filter by workshop id
export default function WorkshopRegistrations({workshopId,capacity}:{workshopId:string,capacity:number}){
    const {data:session} = useSession()
    const [registrations,setRegistrations] = useState<RegistrationItem[]|null>(null)
    const [error,setError] = useState("")
    const [reloadKey,setReloadKey] = useState(0)
    const token = session?.user.role==='admin' ? session.user.token : undefined

    useEffect(()=>{
        if(!token) return
        let ignore = false
        getRegistrations(token)
            .then((json)=>{
                if(ignore) return
                setRegistrations((json.data as RegistrationItem[]).filter((reg)=>reg.workshop?._id===workshopId))
            })
            .catch((err)=>{ if(!ignore) setError((err as Error).message) })
        return ()=>{ ignore = true }
    },[token,workshopId,reloadKey])

    if(!token) return null   // members and guests don't see this section

    const onDelete = async (registration:RegistrationItem)=>{
        if(!confirm(`Delete ${registration.user.name}'s registration?`)) return
        setError("")
        try{
            await deleteRegistration(token,registration._id)
            setReloadKey((key)=>key+1)
        }catch(err){
            setError((err as Error).message)
        }
    }

    return(
        <div className="bg-white rounded-lg shadow-lg p-4 mt-5 text-left w-full max-w-4xl mx-4">
            <div className="text-lg font-medium mb-2">
                Registrations {registrations? `(${registrations.length}/${capacity})` : null}
            </div>
            {error? <div className="text-red-600 text-sm mb-2">{error}</div> : null}
            {
                registrations===null? (error? null : <LinearProgress/>)
                : registrations.length===0? <div className="text-gray-600 text-sm">No one has registered yet.</div>
                : <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-gray-600 border-b text-left">
                                <th className="py-2 pr-2">Name</th>
                                <th className="py-2 pr-2">Email</th>
                                <th className="py-2 pr-2">Tel</th>
                                <th className="py-2 pr-2">Registered</th>
                                <th className="py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((reg)=>(
                                <tr key={reg._id} className="border-b last:border-0">
                                    <td className="py-2 pr-2">{reg.user.name}</td>
                                    <td className="py-2 pr-2">{reg.user.email}</td>
                                    <td className="py-2 pr-2">{reg.user.tel}</td>
                                    <td className="py-2 pr-2 whitespace-nowrap">{new Date(reg.createdAt).toLocaleDateString("en-GB")}</td>
                                    <td className="py-2 text-right">
                                        <button onClick={()=>onDelete(reg)}
                                            className="rounded-md bg-red-600 hover:bg-red-800 px-3 py-1 text-white">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}
