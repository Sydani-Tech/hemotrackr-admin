import success from "@/assets/auth/success.svg"
import { useNavigate } from "react-router-dom";

export default function AccountSuccessScreen() {
    const navigate = useNavigate();
  return (
    <div className="flex-1 flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 py-8">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto w-full">
        <h2 className="text-primary font-semibold mb-1">
          Your details was submitted
          <br />
          successfully
        </h2>

        <h1 className="text-xl font-serif text-primary mt-8 mb-12">
          Congratulations!
        </h1>

        <div className="flex items-center justify-center mb-16 ">
            <img src={success} alt="" />
        </div>

        <button className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors shadow-lg shadow-blue-500/30" onClick={()=>{navigate("/auth/login")}}>
          Proceed
        </button>
      </div>
    </div>
  );
}
