import RegistrationMenu from "@/components/RegistrationMenu";
import styles from "./registrations.module.css";

export default function RegistrationLayout({children}:{children:React.ReactNode}){
    return(
        <div className={styles.sectionlayout}>
            <RegistrationMenu/>
            {children}
        </div>
    );
}
