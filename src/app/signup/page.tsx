import SignUpForm from "@/components/SignUpForm"

export default function SignUpPage(){
    return(
        <main className="w-full flex flex-col items-center space-y-4 p-5">
            <div className="text-xl font-medium">Register</div>
            <SignUpForm/>
        </main>
    )
}
