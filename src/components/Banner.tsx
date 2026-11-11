'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useSession } from "next-auth/react"
export default function Banner(){
    const covers = ['/img/cover1.jpg','/img/cover2.jpg','/img/cover3.jpg']
    const [index,setIndex] = useState(0);
    const router = useRouter()
    return(
        <div 
        className="block p-[5px] m-0 w-full h-[80vh] relative" 
        onClick={()=>{setIndex((index+1)%3)}}>
            <Image src={covers[index]}
            alt="cover"
            fill = {true}
            className="object-cover"
            priority
            />
            <div className="absolute inset-0 z-10 bg-black/30">
                <div className="top-[100px] text-white text-center z-20 text-shadow-md relative">
                    <h1 className="text-4xl font-bold font-serif">Learn Something New</h1>
                    <h3 className="text-xl font-serif">find and join workshops with us</h3>
                </div>
            </div>
                        <button className="bg-white text-cyan-600 border border-cyan-600
            font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-5
            hover:bg-cyan-600 hover:text-white hover:border-transparent
            "
            onClick={(e)=>{e.stopPropagation(); router.push('/workshop')}}
            >
                Browse Workshops NOW
            </button>

        </div>
    )
}