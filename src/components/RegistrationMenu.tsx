import Link from "next/link";
import styles from "./registrationMenu.module.css";

export default function RegistrationMenu(){
    return(
        <div className={styles.submenu}>
            <div className="font-medium mb-2">Registration Menu</div>
            <Link href="/registrations" className="block py-1 text-cyan-700 hover:underline">My Registrations</Link>
            <Link href="/registrations/manage" className="block py-1 text-cyan-700 hover:underline">Profile & Summary</Link>
            <Link href="/cart" className="block py-1 text-cyan-700 hover:underline">Registration Cart</Link>
            <Link href="/workshop" className="block py-1 text-cyan-700 hover:underline">Browse Workshops</Link>
        </div>
    );
}
