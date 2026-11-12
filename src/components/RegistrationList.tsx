"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Select, MenuItem, LinearProgress } from "@mui/material"
import getRegistrations from "@/libs/getRegistrations"
import getWorkshops from "@/libs/getWorkshops"
import updateRegistration from "@/libs/updateRegistration"
import deleteRegistration from "@/libs/deleteRegistration"
import { formatWorkshopDate } from "@/libs/config"
import { RegistrationItem, WorkshopItem } from "../../interfaces"

const buttonClass = "block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white"

// member: own registrations, admin: every registration (backend filters by role)
export default function RegistrationList(){
    const {data:session} = useSession()
    const [registrations,setRegistrations] = useState<RegistrationItem[]|null>(null)
    const [workshops,setWorkshops] = useState<WorkshopItem[]>([])
    const [editingId,setEditingId] = useState<string|null>(null)
    const [selectedWorkshop,setSelectedWorkshop] = useState("")
    const [error,setError] = useState("")
    const [reloadKey,setReloadKey] = useState(0)
    const token = session?.user.token

    // load registrations + workshop choices; runs again when reloadKey changes
    useEffect(()=>{
        if(!token) return
        let ignore = false
        Promise.all([getRegistrations(token), getWorkshops()])
            .then(([regJson,workshopJson])=>{
                if(ignore) return
                setRegistrations(regJson.data)
                setWorkshops(workshopJson.data)
            })
            .catch((err)=>{ if(!ignore) setError((err as Error).message) })
        return ()=>{ ignore = true }
    },[token,reloadKey])
    const fetchData = ()=>setReloadKey((key)=>key+1)

    const onSave = async (registrationId:string)=>{
        if(!session?.user.token) return
        setError("")
        try{
            await updateRegistration(session.user.token,registrationId,selectedWorkshop)
            setEditingId(null)
            fetchData()
        }catch(err){
            setError((err as Error).message)
        }
    }
    const onDelete = async (registrationId:string)=>{
        if(!session?.user.token) return
        if(!confirm("Delete this registration?")) return
        setError("")
        try{
            await deleteRegistration(session.user.token,registrationId)
            fetchData()
        }catch(err){
            setError((err as Error).message)
        }
    }

    if(!session) return null
    if(!registrations) return error? <div className="text-red-600 m-5">{error}</div>
        : <div className="m-5">Loading registrations... <LinearProgress/></div>

    const isAdmin = session.user.role==='admin'
    return(
        <div className="w-full">
            <div className="text-xl font-medium mx-5">
                {isAdmin? "All Registrations" : "My Registrations"} ({registrations.length})
            </div>
            {error? <div className="text-red-600 mx-5 my-2">{error}</div> : null}
            {registrations.length===0?
                <div className="mx-5 my-2">No registration yet. <Link href="/workshop" className="text-cyan-600 underline">Browse workshops</Link></div>
                : null}
            {registrations.map((reg)=>(
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={reg._id}>
                    <div className="text-xs text-gray-500">Registration ID: {reg._id}</div>
                    {reg.workshop? <>
                        <div className="text-xl">
                            <Link href={`/workshop/${reg.workshop._id}`} className="hover:underline">{reg.workshop.name}</Link>
                            {reg.workshop.isActive===false? <span className="text-sm text-red-600"> (workshop removed)</span>:null}
                        </div>
                        <div className="text-md">Date: {formatWorkshopDate(reg.workshop.workshopDate)} @ {reg.workshop.location}</div>
                        <div className="text-md">Instructor: {reg.workshop.instructor}</div>
                    </> : <div className="text-xl text-red-600">Workshop not available</div>}
                    {isAdmin && reg.user? <div className="text-md">Member: {reg.user.name} ({reg.user.email}, {reg.user.tel})</div> : null}

                    {editingId===reg._id?
                        <div className="flex flex-row gap-3 my-2 items-center">
                            <Select variant="standard" className="h-[2em] w-[300px] bg-white" value={selectedWorkshop}
                                onChange={(e)=>setSelectedWorkshop(e.target.value)}>
                                {workshops.map((w)=>(
                                    <MenuItem key={w._id} value={w._id}>{w.name} - {formatWorkshopDate(w.workshopDate)}</MenuItem>
                                ))}
                            </Select>
                            <button className={buttonClass} onClick={()=>onSave(reg._id)}>Save</button>
                            <button className="block rounded-md bg-gray-500 hover:bg-gray-700 px-3 py-2 text-white"
                                onClick={()=>setEditingId(null)}>Cancel</button>
                        </div>
                        :
                        <div className="flex flex-row gap-3 my-2">
                            <button className={buttonClass} onClick={()=>{
                                setEditingId(reg._id); setSelectedWorkshop(reg.workshop?._id ?? "")}}>
                                Edit Workshop</button>
                            <button className="block rounded-md bg-red-600 hover:bg-red-800 px-3 py-2 text-white"
                                onClick={()=>onDelete(reg._id)}>Delete</button>
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}
