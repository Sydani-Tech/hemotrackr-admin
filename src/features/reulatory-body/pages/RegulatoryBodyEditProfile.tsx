import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Instagram, Twitter, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RegulatoryBodyEditProfile() {
  const navigate = useNavigate();

  const handleSave = () => {
    // Mock save functionality
    navigate("/regulation/profile");
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50/50 min-h-screen">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate(-1)} className="w-32">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 w-32"
        >
          Save Changes
        </Button>
      </div>

      {/* Institution Information */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <h3 className="text-blue-600 font-semibold uppercase text-sm mb-6">
            INSTITUTION INFORMATION
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label
                htmlFor="institutionDetails"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Institution Name
              </label>
              <input
                id="institutionDetails"
                defaultValue="National Blood Service Agency"
                className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="licenseNumber"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                License Number
              </label>
              <input
                id="licenseNumber"
                defaultValue="LG12356-HP"
                className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="bloodBank"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Blood Bank
              </label>
              <input
                id="bloodBank"
                defaultValue="No"
                className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
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
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email Address
              </label>
              <input
                id="email"
                defaultValue="nbsa.gov@workgmail.com"
                className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Phone Number
              </label>
              <input
                id="phone"
                defaultValue="+234 706 123 4567"
                className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="address"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Address
              </label>
              <input
                id="address"
                defaultValue="No 34 William drive, Victoria Island, Ikeja..."
                className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
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
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex flex-col items-center justify-center gap-2 border-dashed cursor-pointer hover:bg-blue-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Upload className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-blue-600 text-sm font-medium">
                Click to upload
              </span>
              <span className="text-xs text-gray-400">JPG, PNG up to 2MB</span>
            </div>
            <div className="mt-4 flex items-center gap-2 p-2 border border-gray-100 rounded bg-white">
              <div className="bg-blue-600 p-1 rounded">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-blue-600">Image</div>
                <div className="text-[10px] text-gray-400">528KB - JPG</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-red-500"
              >
                x
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cover Picture */}
        <Card className="shadow-sm border border-gray-100">
          <CardContent className="p-6">
            <div className="text-xs text-gray-500 mb-2">Cover Picture</div>
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex flex-col items-center justify-center gap-2 border-dashed cursor-pointer hover:bg-blue-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Upload className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-blue-600 text-sm font-medium">
                Click to upload
              </span>
              <span className="text-xs text-gray-400">JPG, PNG up to 5MB</span>
            </div>
            <div className="mt-4 flex items-center gap-2 p-2 border border-gray-100 rounded bg-white">
              <div className="bg-blue-600 p-1 rounded">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-blue-600">Image</div>
                <div className="text-[10px] text-gray-400">528KB - JPG</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-red-500"
              >
                x
              </Button>
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
              Add your social media links
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 w-32">
                  <Instagram className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 text-sm">Instagram</span>
                </div>
                <input
                  placeholder="Instagram URL"
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 w-32">
                  <Twitter className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 text-sm">Twitter</span>
                </div>
                <input
                  placeholder="Twitter URL"
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
