import InteractiveCard from "./InteractiveCard";

export default function ProductCard({workshopName,workshopDate,location,instructor}
    :{workshopName:string,workshopDate:string,location:string,instructor:string}){
    return(
        <InteractiveCard contentName={workshopName}>
            <div className="w-full p-[10px]">
                <div className="font-bold text-lg text-gray-900 line-clamp-2">{workshopName}</div>
                <div className="text-sm text-gray-600 mt-1">{workshopDate}</div>
                <div className="text-sm text-gray-500 truncate">{instructor} @{location}</div>
            </div>
        </InteractiveCard>

    )
}