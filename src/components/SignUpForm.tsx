'use client'
import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Select, MenuItem } from "@mui/material"
import userRegister from "@/libs/userRegister"

const inputClass = "block w-full text-gray-900 text-sm rounded-lg p-2 bg-purple-50 " +
    "ring-inset ring-1 ring-purple-400 focus:outline-none focus:bg-purple-100 focus:ring-2"

export default function SignUpForm(){
    const router = useRouter()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [tel,setTel] = useState("")
    const [role,setRole] = useState("member")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    const onSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        setError("")
        if(password.length<6){ setError("Password must be at least 6 characters"); return }
        try{
            await userRegister({name,email,tel,role,password})
            // log in right after registering
            const result = await signIn("credentials",{email,password,redirect:false})
            router.push(result?.ok? "/" : "/signin")
            router.refresh()   // re-render server components (top menu) with the new session
        }catch(err){
            const message = (err as Error).message
            setError(message.includes("duplicate key")? "This email is already registered" : message)
        }
    }

    return(
        <form onSubmit={onSubmit} className="w-[400px] max-w-full space-y-3 text-left">
            <label className="block text-sm text-gray-600">Name
                <input className={inputClass} value={name} onChange={(e)=>setName(e.target.value)} required/>
            </label>
            <label className="block text-sm text-gray-600">Email
                <input className={inputClass} type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </label>
            <label className="block text-sm text-gray-600">Tel
                <input className={inputClass} type="tel" value={tel} onChange={(e)=>setTel(e.target.value)} required/>
            </label>
            <div className="text-sm text-gray-600">Role</div>
            <Select variant="standard" className="h-[2em] w-[200px]" value={role} onChange={(e)=>setRole(e.target.value)}>
                <MenuItem value="member">Member</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
            </Select>
            <label className="block text-sm text-gray-600">Password
                <input className={inputClass} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </label>
            {error? <div className="text-red-600 text-sm">{error}</div>:null}
            <button type="submit" className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white">Register</button>
            <div className="text-sm">Already have an account? <Link href="/signin" className="text-cyan-600 underline">Sign In</Link></div>
        </form>
    )
}
