import { useNavigate } from "react-router-dom";
import {  FileText, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RegulatoryBodyProfile() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6 bg-gray-50/50 min-h-screen">
      

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            National Blood Service Agency (NBSA)
          </h1>
          <p className="text-gray-500">Regulatory Institution</p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 w-32"
          onClick={() => navigate("edit")}
        >
          Edit profile
        </Button>
      </div>

      {/* Institution Information */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <h3 className="text-blue-600 font-semibold uppercase text-sm mb-6">
            INSTITUTION INFORMATION
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                Institution Name
              </div>
              <div className="text-gray-500 text-sm">
                National Blood Service Agency
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                License Number
              </div>
              <div className="text-gray-500 text-sm">LG12356-HP</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                Blood Bank
              </div>
              <div className="text-gray-500 text-sm">No</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <h3 className="text-blue-600 font-semibold uppercase text-sm mb-6">
            CONTACT INFORMATION
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                Email Address
              </div>
              <div className="text-gray-500 text-sm">
                nbsa.gov@workgmail.com
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                Phone Number
              </div>
              <div className="text-gray-500 text-sm">+234 706 123 4567</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                Address
              </div>
              <div className="text-gray-500 text-sm">
                No 34 William drive, Victoria Island, Ikeja, Wuse 2, Nigeria.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pictures Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Picture */}
        <Card className="shadow-sm border border-gray-100">
          <CardContent className="p-6">
            <div className="text-xs text-gray-500 mb-2">Profile Picture</div>
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2 flex items-center justify-between">
              <span className="text-gray-500 text-sm ml-2">
                Upload a Picture
              </span>
              <div className="bg-white rounded border border-gray-100 p-2 flex items-center gap-2">
                <div className="bg-blue-600 p-1 rounded">
                  <FileText className="w-3 h-3 text-white" />
                </div>
                <div>
                  <div className="text-xs font-medium text-blue-600">Image</div>
                  <div className="text-[10px] text-gray-400">528KB - JPG</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cover Picture */}
        <Card className="shadow-sm border border-gray-100">
          <CardContent className="p-6">
            <div className="text-xs text-gray-500 mb-2">Cover Picture</div>
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2 flex items-center justify-between">
              <span className="text-gray-500 text-sm ml-2">
                Upload a Picture
              </span>
              <div className="bg-white rounded border border-gray-100 p-2 flex items-center gap-2">
                <div className="bg-blue-600 p-1 rounded">
                  <FileText className="w-3 h-3 text-white" />
                </div>
                <div>
                  <div className="text-xs font-medium text-blue-600">Image</div>
                  <div className="text-[10px] text-gray-400">528KB - JPG</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Connections */}
      <div className="md:w-1/2">
        <Card className="shadow-sm border border-gray-100">
          <CardContent className="p-6">
            <div className="text-gray-500 text-sm mb-1">Social Connections</div>
            <div className="text-xs text-gray-400 mb-6">
              Help your fans verify your account by connecting social
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    {/* Mock Instagram Icon or use lucide Camera/Instagram if available */}
                    <Instagram className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-gray-700 text-sm">Instagram</span>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 h-8 text-xs w-24">
                  Link
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Twitter className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-gray-700 text-sm">Twitter</span>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 h-8 text-xs w-24">
                  Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
