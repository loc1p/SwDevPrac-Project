import Link from "next/link"
export default function TopMenuItem({title,pageRef}:{title:string,pageRef:string}){
    return (
        <Link href={pageRef}
            className="flex items-center justify-center h-full px-3 lg:px-0 lg:w-[120px] whitespace-nowrap
                font-sans text-[10pt] text-gray-500 hover:text-cyan-600">
            {title}
        </Link>
    )

}
