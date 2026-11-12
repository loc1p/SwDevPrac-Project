import WorkshopForm from "@/components/WorkshopForm"
import { authOptions } from "@/libs/authOptions"
import { getServerSession } from "next-auth"

export default async function NewWorkshopPage(){
    const session = await getServerSession(authOptions)
    if(session?.user.role!=='admin'){
        return <main className="text-center p-5 text-red-600">Only admin can add workshops</main>
    }
    return(
        <main>
            <div className="text-xl flex flex-col items-center space-y-4 p-5">Add Workshop
                <WorkshopForm/>
                </div>
        </main>

    )
}