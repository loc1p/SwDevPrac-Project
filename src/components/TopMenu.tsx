import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import {getServerSession} from 'next-auth';
import {authOptions} from "@/libs/authOptions";
import Link from 'next/link';
export default async function TopMenu(){
    const session = await getServerSession(authOptions)

return(
    <div className="h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-300 flex flex-row">
        {/* left: logo always visible */}
        <Link href="/" className="h-full shrink-0">
            <Image src={'/img/logo.svg'} className="h-full w-auto p-[5px]" alt="logo"
            width={0} height={0} sizes='100vh'
            />
        </Link>

        {/* middle: menu items scroll sideways on small screens (scrollbar hidden) */}
        <div className="flex flex-row flex-1 min-w-0 h-full overflow-x-auto overflow-y-hidden
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TopMenuItem title='Workshops' pageRef='/workshop'/>
            <TopMenuItem title='Registrations' pageRef='/registrations'/>
            {
                session?.user.role==='admin'? <>
                    <TopMenuItem title='Dashboard' pageRef='/dashboard'/>
                    <TopMenuItem title='Add Workshop' pageRef='/workshop/new'/>
                </> : <TopMenuItem title='Cart' pageRef='/cart'/>
            }
            <TopMenuItem title='About' pageRef='/about'/>
        </div>

        {/* right: sign-in / sign-out always visible */}
        <div className="flex flex-row pr-2 h-full shrink-0">
        {
            session? <Link href="/api/auth/signout?callbackUrl=/" className="flex items-center h-full px-2 text-cyan-600 text-sm whitespace-nowrap">
                {/* short label on small/medium screens, full label from lg up */}
                <span className="lg:hidden">Sign-Out</span>
                <span className="hidden lg:inline">Sign-Out of {session.user?.name} ({session.user?.role})</span>
            </Link>
            : <>
                <Link href="/signup" className="flex items-center h-full px-2 text-cyan-600 text-sm whitespace-nowrap">Register</Link>
                <Link href="/signin?callbackUrl=/" className="flex items-center h-full px-2 text-cyan-600 text-sm whitespace-nowrap">Sign-In</Link>
              </>
        }
        </div>
    </div>
)
}
