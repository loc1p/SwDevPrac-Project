'use client'
import DateReserve from "./DateReserve";
import { WorkshopItem } from "../../interfaces";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState} from "react"
import dayjs,{Dayjs} from "dayjs";
import { toDateString } from "@/libs/config";
import updateWorkshop from "@/libs/updateWorkshop";
import createWorkshop from "@/libs/createWorkshop";

const inputClass = "block w-full text-gray-900 text-sm rounded-lg p-2 bg-purple-50 " +
    "ring-inset ring-1 ring-purple-400 focus:outline-none focus:bg-purple-100 focus:ring-2"

export default function WorkshopForm({initial}:{initial?:WorkshopItem}){
    const router = useRouter();
    const {data:session} = useSession();

    const [name,setName] = useState(initial?.name ?? "")
    const [description,setDescription] = useState(initial?.description ?? "")
    const [instructor,setInstructor] = useState(initial?.instructor ?? "")
    const [location,setLocation] = useState(initial?.location ?? "")
    const [capacity,setCapacity] = useState<string>(initial ? String(initial.capacity) : "20")
    const [workshopDate,setWorkshopDate] = useState<Dayjs|null>(
        initial ? dayjs(toDateString(initial.workshopDate)) : null)
    const [error,setError] = useState("")
    const [saving,setSaving] = useState(false)

    const submitWorkshop = async(e:React.FormEvent)=>{
        e.preventDefault()
        setError("")
        if(!session?.user.token) { setError("Please sign in as admin"); return }
        if(!name||!description||!instructor||!location||!workshopDate){
            setError("Please fill in every field"); return
        }
        if(workshopDate.isBefore(dayjs(),"day")){
            setError("Workshop date cannot be before today"); return
        }
        const cap = Number(capacity)
        if(!Number.isInteger(cap)||cap<1){
            setError("Capacity must be positive integer")
            return
        }
        const body = {
            name, description, instructor, location,
            workshopDate: workshopDate.format("YYYY-MM-DD"),
            capacity: cap,
        }
        try{
            setSaving(true)
const result = initial
    ? await updateWorkshop({ token: session.user.token, id: initial._id, workshop: body })
    : await createWorkshop({ token: session.user.token, workshop: body })
    router.push(`/workshop/${result.data._id}`)
    router.refresh()
        }
        catch(err){
            setError((err as Error).message)
        } finally{
            setSaving(false);
        }

    }
    return(
            <form className="w-[500px]  max-w-full space-y-3 text-left"  onSubmit={submitWorkshop}>
                <label className="block text-sm text-gray-600">
                    Workshop Name <input className={inputClass} value={name} onChange={(e)=>setName(e.target.value)} />
                </label>
                <label className="block text-sm text-gray-600">
                    Description <textarea className={inputClass} rows={3} value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                </label>
                <label className="block text-sm text-gray-600">
                    Instructor <input className={inputClass} value={instructor} onChange={(e)=>setInstructor(e.target.value)}/>
                </label>
                <label className="block text-sm text-gray-600">
                    Location <input className={inputClass} value={location} onChange={(e)=>setLocation(e.target.value)}/>
                </label>
                <label className="block text-sm text-gray-600">
                    Capacity <input className={inputClass} type="number" value={capacity} onChange={(e)=>setCapacity(e.target.value)}/>
                </label>
                <div className="text-sm text-gray-600">Workshop Date</div>
                <DateReserve initialDate={workshopDate} onDateChange={(value:Dayjs|null)=>{setWorkshopDate(value)}}/>
                {error? <div className="text-red-600 text-sm">{error}</div> : null}
                <button type="submit" disabled={saving}
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white disabled:opacity-50">
                {saving? "Saving..." : initial? "Save Changes" : "Add Workshop"}
            </button>
            </form>
    )
}