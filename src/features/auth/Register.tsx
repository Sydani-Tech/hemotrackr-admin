import { AvatarHeader, LoginLink } from "@/components/auth/Shared";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate()
  return (
    <div className="flex-1 flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 py-8">
         <div className="max-w-md mx-auto w-full">
            <AvatarHeader />

            <div className="mb-8">
                <h1 className="text-3xl font-serif text-primary-dark mb-4 leading-tight">Create an account with <br />Hemo Tracka</h1>
                <p className="text-gray-500 text-sm">How would you like to continue?</p>
            </div>

            <div className="space-y-4">
                <button className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-3.5 rounded-md transition-colors shadow-sm text-sm" onClick={()=>{navigate("/auth/register/donor")}}>
                    As a donor
                </button>
                <button className="w-full bg-white border border-primary hover:bg-blue-50 text-primary font-medium py-3.5 rounded-md transition-colors shadow-sm text-sm" onClick={()=>{navigate("/auth/register/blood-bank")}}>
                    As a blood bank
                </button>
                <button className="w-full bg-white border border-primary hover:bg-blue-50 text-primary font-medium py-3.5 rounded-md transition-colors shadow-sm text-sm">
                    As a hospital
                </button>
            </div>

            <LoginLink />
        </div>
    </div>
       
    );
}
