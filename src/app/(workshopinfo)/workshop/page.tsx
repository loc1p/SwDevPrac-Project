import getWorkshops from "@/libs/getWorkshops";
import WorkshopCatalog from "@/components/WorkshopCatalog";
import { LinearProgress } from "@mui/material";
import {Suspense} from "react"
export default async function Workshop({searchParams}:{searchParams:Promise<{search?:string}>}) {
  const {search} = await searchParams
  const workshops = getWorkshops(search ?? "")
  return (
    <main>
    <h1 className="p-5">Workshop Page</h1>
    <form className="flex flex-row justify-center gap-2 my-4" action="/workshop">
                <input type="text" name="search" defaultValue={search ?? ""} placeholder="Search name, instructor, location..."
                    className="block w-[350px] text-gray-900 text-sm rounded-lg p-2 bg-purple-50
                    ring-inset ring-1 ring-purple-400 focus:outline-none focus:bg-purple-100 focus:ring-2"/>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white">Search</button>
            </form>
    <Suspense key={search ?? ""} fallback={<div>loading ...  <LinearProgress/> </div>}>
    <WorkshopCatalog workshopJson={workshops}/>
    </Suspense>
</main>
  );
}