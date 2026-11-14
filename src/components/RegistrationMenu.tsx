import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export default async function RegistrationMenu(){
    const session = await getServerSession(authOptions)
    // admin sees every registration and cannot register, so no cart link
    const isAdmin = session?.user.role === 'admin'

    return(
        // full width on small screens, fixed 250px column from md up
        <div className="bg-white rounded-[10px] border border-[silver] p-[10px] m-[5px] h-fit
            w-auto md:w-[250px] md:min-w-[250px]">
            <div className="font-medium mb-2">Registration Menu</div>
            <Link href="/registrations" className="block py-1 text-cyan-700 hover:underline">
                {isAdmin? "All Registrations" : "My Registrations"}</Link>
            <Link href="/registrations/manage" className="block py-1 text-cyan-700 hover:underline">Profile & Summary</Link>
            {isAdmin? null :
                <Link href="/cart" className="block py-1 text-cyan-700 hover:underline">Registration Cart</Link>}
            <Link href="/workshop" className="block py-1 text-cyan-700 hover:underline">Browse Workshops</Link>
        </div>
    );
}
