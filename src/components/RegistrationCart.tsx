"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { removeFromCart } from "@/redux/features/cartSlice"
import createRegistration from "@/libs/createRegistration"
import { formatWorkshopDate } from "@/libs/config"

const buttonClass = "block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white"

export default function RegistrationCart() {
    const workshopItems = useAppSelector((state)=>state.cartSlice.workshopItems)
    const dispatch = useDispatch<AppDispatch>()
    const {data:session} = useSession()
    const router = useRouter()
    const [messages,setMessages] = useState<{[id:string]:string}>({})

    // send the registration to backend; remove from cart when it succeeds
    const confirmRegistration = async (workshopId:string)=>{
        if(!session?.user.token) return
        try{
            await createRegistration(session.user.token,workshopId)
            dispatch(removeFromCart(workshopId))
            router.push('/registrations')
            router.refresh()
        }catch(err){
            setMessages({...messages,[workshopId]:(err as Error).message})
        }
    }

    if(workshopItems.length===0){
        return (
            <div className="text-center m-5">
                Your cart is empty. <Link href="/workshop" className="text-cyan-600 underline">Browse workshops</Link>
            </div>
        )
    }

    return(
        <>
            {workshopItems.map((cartItem)=>(
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={cartItem.workshopId}>
                    <div className="text-xl">
                        {cartItem.workshopName}
                    </div>
                    <div className="text-md">Date: {formatWorkshopDate(cartItem.workshopDate)}</div>
                    <div className="text-md">Location: {cartItem.location}</div>
                    <div className="text-md">Instructor: {cartItem.instructor}</div>
                    {messages[cartItem.workshopId]? <div className="text-red-600">{messages[cartItem.workshopId]}</div>:null}
                    <div className="flex flex-row gap-3 my-2">
                        <button className={buttonClass} onClick={()=>confirmRegistration(cartItem.workshopId)}>
                            Confirm Registration</button>
                        <button className="block rounded-md bg-gray-500 hover:bg-gray-700 px-3 py-2 text-white"
                            onClick={()=>dispatch(removeFromCart(cartItem.workshopId))}>
                            Remove from Cart</button>
                    </div>
                </div>
            )
            )}
        </>
    )
}
