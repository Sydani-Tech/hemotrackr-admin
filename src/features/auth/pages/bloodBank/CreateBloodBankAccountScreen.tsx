import { AvatarHeader, LoginLink } from "@/components/auth/Shared";
import { useNavigate } from "react-router-dom";

export default function CreateBloodBankAccountScreen() {
  const navigate = useNavigate();
 return(

  <div className="flex-1 flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 py-8">
      <div className="max-w-md mx-auto w-full">
        <AvatarHeader />

        <div className="mb-4">
          <h1 className="text-3xl font-serif text-primary-dark mb-4 leading-tight">
            Create an account withHemo Tracka
          </h1>
        </div>

        <div className="space-y-4 text-gray-700">
          <form action="" className="space-y-4">
            <div className="">
              <label htmlFor="" className="text-gray-400 text-xs font-medium ">
                ENTER YOUR COMPANY EMAIL
              </label>{" "}
              <br />
              <input
                type="text"
                className="rounded-sm border border-gray-300 px-3 py-2 text-gray-600 outline-none w-full text-sm"
              />
            </div>
            <button
              className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-3.5 rounded-md transition-colors shadow-sm text-sm"
              onClick={()=>{navigate("/auth/register/otp")}}
            >
              Continue
            </button>
          </form>
        </div>

        <LoginLink/>
      </div>
    </div>
 )
}
