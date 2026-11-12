"use client"
import AddToCartButton from "./AddToCartButton"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { CartItem } from "../../interfaces"
import { useState } from "react"
import Link from "next/link"
import deleteWorkshop from "@/libs/deleteWorkshop"
const buttonClass = "block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white"

export default function WorkshopActions({item,isPast}:{item:CartItem,isPast:boolean}){
    const {data:session} = useSession()
    const router = useRouter()
    const [message,setMessage] = useState("")

    if(session?.user.role!=='admin'){
        return <AddToCartButton item={item} isPast={isPast}/>
    }
    const onDelete = async ()=>{
        if(!confirm(`Delete workshop "${item.workshopName}"?`)) return
        try{
            await deleteWorkshop({token:session.user.token,id:item.workshopId})
            router.push('/workshop')
            router.refresh()
        }catch(err){
            setMessage((err as Error).message)
        }
    }
    return (
        <div className="flex flex-row gap-3 mt-3">
            <Link href={`/workshop/${item.workshopId}/edit`}><button className={buttonClass}>Edit Workshop</button></Link>
            <button className="block rounded-md bg-red-600 hover:bg-red-800 px-3 py-2 text-white" onClick={onDelete}>Delete Workshop</button>
            {message? <div className="text-red-600 self-center">{message}</div>:null}
        </div>
    )
}