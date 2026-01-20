import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, LinkIcon, Twitter } from "lucide-react";


export default function MedicalTestModal() {
  return (
    <div className="w-80 shrink-0">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="relative rounded-2xl overflow-hidden h-40 mb-4 bg-gray-900">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Medical Test"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
              <p className="text-xs font-bold uppercase tracking-wider mb-1">
                FREE MEDICAL TEST
              </p>
              <h3 className="font-bold text-lg leading-tight mb-4">
                Get your free medical test at HTPS Hospital
              </h3>
              <button className="bg-white text-blue-500 text-[10px] font-semibold py-1 px-3 rounded w-fit">
                Click to find out more.
              </button>
            </div>
          </div>

          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors mb-6 shadow-lg shadow-blue-200">
            Proceed
          </Button>

          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-3">Share</h4>
            <div className="flex gap-4 text-gray-400">
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-700" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-600" />
              <LinkIcon className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
        </div>
      </div>
  )
}
