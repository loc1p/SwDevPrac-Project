import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/authOptions"
import WorkshopForm from "@/components/WorkshopForm"
import { WorkshopItem } from "../../../.././../../interfaces"
import Link from "next/link"
import getWorkshop from "@/libs/getWorkshop"
export default async function WorkshopEditPage({params}:{params:Promise<{wid:string}>}){
    const session = await getServerSession(authOptions)
        if(session?.user.role!=='admin'){
            return <main className="text-center p-5 text-red-600">Only admin can edit workshops</main>
        }
        const { wid } = await params
        let workshopDetail
try {
    workshopDetail = await getWorkshop(wid)
} catch (err) {
    return (
        <main className="text-center p-5">
            <div className="text-red-600">{(err as Error).message}</div>
            <Link href="/workshop" className="text-cyan-600 underline">Back to workshops</Link>
        </main>
    )
}
        return(
            <main>
                <div className="text-xl flex flex-col items-center space-y-4 p-5">Edit Workshop
                    <WorkshopForm initial={workshopDetail.data as WorkshopItem} />
                </div>
            </main>
    
        )
}