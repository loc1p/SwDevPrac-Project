import Link from "next/link"
import ProductCard from "./ProductCard"
import { WorkshopItem, WorkshopJson } from "../../interfaces"
import { formatWorkshopDate} from "@/libs/config"

export default async function WorkshopCatalog({workshopJson}:{workshopJson:Promise<WorkshopJson>}){
    let workshopJsonReady: WorkshopJson
    try {
        workshopJsonReady = await workshopJson
    } catch (err) {
        return <p className="text-red-600 my-5">Cannot load workshops: {(err as Error).message}</p>
    }
    return(
    <>
    Explore {workshopJsonReady.count} workshops in our catalog
     <div>
        <div style={{margin:"20px",display:"flex",flexDirection:"column",
            flexWrap:"wrap",justifyContent:"space-around",gap:"20px"}}>

            {
                workshopJsonReady.data.map((workshopItem:WorkshopItem)=>(
                    <Link key={workshopItem._id} className="w-[100%] min-w-[220px]" href={`/workshop/${workshopItem._id}`}>
                        <ProductCard workshopName={workshopItem.name}
                            workshopDate={formatWorkshopDate(workshopItem.workshopDate)}
                            location={workshopItem.location}
                            instructor={workshopItem.instructor}
                            />
                    </Link>
                ))
            }

      </div>
      </div>
    </>
    )
}