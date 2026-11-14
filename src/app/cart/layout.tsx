import RegistrationMenu from "@/components/RegistrationMenu";

// same side menu as /registrations so the cart page has the left bar too
// small screens: menu on top; md and up: menu on the left
export default function CartLayout({children}:{children:React.ReactNode}){
    return(
        <div className="flex flex-col md:flex-row p-[10px]">
            <RegistrationMenu/>
            {children}
        </div>
    );
}
