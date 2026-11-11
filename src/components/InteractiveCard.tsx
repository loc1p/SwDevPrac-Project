export default function InteractiveCard({children,contentName}:{children:React.ReactNode,contentName:string}){
    return(
        <div title={contentName} className="w-full h-[100px] rounded-lg shadow-lg bg-sky-200 text-left hover:bg-sky-300 hover:shadow-2xl">
            {children}
        </div>
)
}