import { Suspense } from "react"
import SignInForm from "@/components/SignInForm"

export default function SignInPage(){
    return(
        <main className="w-full flex flex-col items-center space-y-4 p-5">
            <div className="text-xl font-medium">Sign In</div>
            <Suspense fallback={<div>loading...</div>}>
                <SignInForm/>
            </Suspense>
        </main>
    )
}
