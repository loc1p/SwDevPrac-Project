import RegistrationMenu from "@/components/RegistrationMenu";

// small screens: menu on top; md and up: menu on the left
export default function RegistrationLayout({children}:{children:React.ReactNode}){
    return(
        <div className="flex flex-col md:flex-row p-[10px]">
            <RegistrationMenu/>
            {children}
        </div>
    );
}
