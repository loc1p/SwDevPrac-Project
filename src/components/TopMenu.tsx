import styles from './topmenu.module.css'
import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import {getServerSession} from 'next-auth';
import {authOptions} from "@/libs/authOptions";
import Link from 'next/link';
export default async function TopMenu(){
    const session = await getServerSession(authOptions)

return(
    <div className={styles.menucontroller}>
        <Link href="/" className="h-full">
            <Image src={'/img/logo.svg'} className={styles.logoimg} alt="logo"
            width={0} height={0} sizes='100vh'
            />
        </Link>
        <TopMenuItem title='Workshops' pageRef='/workshop'/>
        <TopMenuItem title='Registrations' pageRef='/registrations'/>
        {
            session?.user.role==='admin'? <>
                <TopMenuItem title='Dashboard' pageRef='/dashboard'/>
                <TopMenuItem title='Add Workshop' pageRef='/workshop/new'/>
            </> : null
        }
        <TopMenuItem title='About' pageRef='/about'/>
        <div className = "flex flex-row absolute right-0 h-full">
        {
            session?.user.role==='admin'? null : <TopMenuItem title='Cart' pageRef='/cart'/>
        }
        {
            session? <Link href="/api/auth/signout?callbackUrl=/"className="flex items-center h-full px-2 text-cyan-600 text-sm"><div>Sign-Out of {session.user?.name} ({session.user?.role})</div></Link>
            : <>
                <Link href="/signup" className="flex items-center h-full px-2 text-cyan-600 text-sm"><div>Register</div></Link>
                <Link href="/signin?callbackUrl=/" className="flex items-center h-full px-2 text-cyan-600 text-sm"><div>Sign-In</div></Link>
              </>
        }
        </div>
    </div>
)
}
