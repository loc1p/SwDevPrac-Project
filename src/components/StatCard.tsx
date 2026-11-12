export default function StatCard({title,value,detail}:{title:string,value:string|number,detail?:string}){
    return(
        <div className="bg-slate-100 rounded-lg p-4 flex-1 min-w-[180px]">
            <div className="text-sm text-gray-600">{title}</div>
            <div className="text-3xl font-medium text-cyan-700 my-1">{value}</div>
            {detail? <div className="text-xs text-gray-500">{detail}</div> : null}
        </div>
    )
}
