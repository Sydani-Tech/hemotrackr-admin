import { AvatarHeader, LoginLink } from "@/components/auth/Shared";
import { useNavigate } from "react-router-dom";

export default function OtpScreen() {
    const navigate = useNavigate()
    return (
        <div className="flex-1 flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 py-8">
            <div className="max-w-md mx-auto w-full">
                <AvatarHeader />

                <div className="mb-8">
                    <h1 className="text-3xl font-serif text-primary-dark mb-4 leading-tight">Enter the verification code</h1>
                    <p className="text-gray-500 text-sm">We have sent a verification code to your email address.</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <input type="text" className="rounded-sm border border-gray-300 px-3 py-2 text-gray-600 outline-none w-full text-sm" />
                        <input type="text" className="rounded-sm border border-gray-300 px-3 py-2 text-gray-600 outline-none w-full text-sm" />
                        <input type="text" className="rounded-sm border border-gray-300 px-3 py-2 text-gray-600 outline-none w-full text-sm" />
                        <input type="text" className="rounded-sm border border-gray-300 px-3 py-2 text-gray-600 outline-none w-full text-sm" />
                        <input type="text" className="rounded-sm border border-gray-300 px-3 py-2 text-gray-600 outline-none w-full text-sm" />
                        <input type="text" className="rounded-sm border border-gray-300 px-3 py-2 text-gray-600 outline-none w-full text-sm" />
                        
                    </div>

                    <button className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-3.5 rounded-md transition-colors shadow-sm text-sm" onClick={()=>navigate("/blood-bank")}>Verify</button>
                </div>

                <LoginLink />
            </div>
        </div>
    )
}