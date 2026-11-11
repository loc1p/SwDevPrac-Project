'use client'
import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

const inputClass = "block w-full text-gray-900 text-sm rounded-lg p-2 bg-purple-50 " +
    "ring-inset ring-1 ring-purple-400 focus:outline-none focus:bg-purple-100 focus:ring-2"

export default function SignInForm(){
    const router = useRouter()
    const urlParams = useSearchParams()
    // only allow internal paths as redirect target
    const rawCallback = urlParams.get('callbackUrl') || '/'
    const callbackUrl = rawCallback.startsWith('/') && !rawCallback.startsWith('//') ? rawCallback : '/'
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(urlParams.get('error')? "Invalid email or password" : "")

    const onSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        setError("")
        const result = await signIn("credentials",{email,password,redirect:false})
        if(result?.ok){
            router.push(callbackUrl)
            router.refresh()   // re-render server components (top menu) with the new session
        } else {
            setError("Invalid email or password")
        }
    }

    return(
        <form onSubmit={onSubmit} className="w-[400px] max-w-full space-y-3 text-left">
            <label className="block text-sm text-gray-600">Email
                <input className={inputClass} type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </label>
            <label className="block text-sm text-gray-600">Password
                <input className={inputClass} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </label>
            {error? <div className="text-red-600 text-sm">{error}</div>:null}
            <button type="submit" className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white">Sign In</button>
            <div className="text-sm">No account? <Link href="/signup" className="text-cyan-600 underline">Register</Link></div>
        </form>
    )
}
