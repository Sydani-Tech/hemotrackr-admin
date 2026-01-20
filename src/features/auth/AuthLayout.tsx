import { Outlet } from "react-router-dom";
import mockup from "../../assets/auth/iphone-mockup.svg";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#F3F6F8] overflow-x-hidden font-sans">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] shadow-2xl md:rounded-3xl overflow-hidden lg:mx-0 mx-8">
          {/* Left Panel - Blue Background with iPhone */}
          <div className="hidden md:flex bg-primary/90 min-h-[500px] lg:h-[550px] items-end justify-center p-8 lg:p-0">
            <img
              src={mockup}
              alt="HemoTracka mobile app preview"
              className="object-contain w-full max-w-md"
            />
          </div>

          {/* Right Panel - Scrollable Content */}
          <div className="relative flex  min-h-screen md:min-h-[500px] lg:h-[550px] overflow-y-auto">
           
              <Outlet />
            {/* Using a fixed SVG at bottom right to simulate the yellow/blue wave */}
            {/* <div className="absolute hidden md:block bottom-0 right-0 w-full h-32 pointer-events-none z-0">

                    <div className="absolute bottom-0 right-0 w-[400px] h-[150px] overflow-hidden">
                        <div className="absolute w-64 h-64 bg-primary rounded-full -right-20 -bottom-56 z-10"></div>
                        <div className="absolute  w-64 h-64 bg-[#EFDD76] rounded-full -right-20 -bottom-52"></div>
                    </div>
                </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
