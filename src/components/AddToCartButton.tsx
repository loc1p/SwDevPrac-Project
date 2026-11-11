'use client'
import Link from "next/link"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { addToCart } from "@/redux/features/cartSlice"
import { CartItem } from "../../interfaces"

const buttonClass = "block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white"

// member side of the workshop detail: sign in prompt / closed message / add to cart
export default function AddToCartButton({item,isPast}:{item:CartItem,isPast:boolean}){
    const {data:session} = useSession()
    const dispatch = useDispatch<AppDispatch>()
    const inCart = useAppSelector((state)=>state.cartSlice.workshopItems)
        .some((obj)=>obj.workshopId===item.workshopId)
    const [message,setMessage] = useState("")

    if(!session){
        return (
            <Link href={`/signin?callbackUrl=/workshop/${item.workshopId}`}>
                <button className={buttonClass}>Sign in to register</button>
            </Link>
        )
    }

    if(isPast) return <div className="text-red-600 mt-3">Registration is closed for this workshop</div>

    return (
        <div className="flex flex-row gap-3 mt-3 items-center">
            <button className={buttonClass + " disabled:opacity-50"} disabled={inCart}
                onClick={()=>{dispatch(addToCart(item)); setMessage("Added to cart")}}>
                {inCart? "Already in Cart" : "Add to Registration Cart"}
            </button>
            <Link href="/cart" className="text-cyan-600 underline">Go to Cart</Link>
            {message? <span className="text-green-700">{message}</span>:null}
        </div>
    )
}
