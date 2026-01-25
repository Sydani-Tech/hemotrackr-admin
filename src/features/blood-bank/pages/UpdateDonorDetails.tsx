import { ArrowLeft, User, Loader2 } from "lucide-react";
import MedicalTestModal from "../components/MedicalTestModal";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { BloodBankAPI } from "@/core/services/BloodBankService";

export default function UpdateDonorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [donor, setDonor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    genotype: "",
    blood_group: "",
    height: "",
    platelets_type: "",
  });

  useEffect(() => {
    if (id) {
      fetchDonor();
    }
  }, [id]);

  const fetchDonor = async () => {
    try {
      const response = await BloodBankAPI.getDonor(id!);
      const donorData = response.data.donor;
      setDonor(donorData);

      // Pre-fill form with existing data
      setFormData({
        genotype: donorData.genotype || "",
        blood_group: donorData.blood_group || "",
        height: donorData.height || "",
        platelets_type: donorData.platelets_type || "",
      });
    } catch (error) {
      console.error("Failed to fetch donor", error);
      alert("Failed to load donor details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await BloodBankAPI.updateDonorHealth(id!, formData);
      alert("Donor health info updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Failed to update donor", error);
      alert("Failed to update donor. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Donor not found</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-3xl font-serif text-gray-900">
            Update donor info
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          {/* User Card */}
          <div className="bg-gray-100/50 rounded-xl p-6 mb-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 shrink-0">
              <User className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {donor.first_name} {donor.last_name}
              </h3>
              <p className="text-sm text-gray-500">
                {donor.email || donor.phone || "No contact info"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-900 block">
                Genotype
              </label>
              <div className="relative">
                <select
                  value={formData.genotype}
                  onChange={(e) => setFormData({ ...formData, genotype: e.target.value })}
                  className="w-full bg-white border border-gray-100 h-12 rounded-lg px-4 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                >
                  <option value="">Choose Genotype</option>
                  <option value="AA">AA</option>
                  <option value="AS">AS</option>
                  <option value="SS">SS</option>
                  <option value="AC">AC</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-900 block">
                Blood Group
              </label>
              <div className="relative">
                <select
                  value={formData.blood_group}
                  onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                  className="w-full bg-white border border-gray-100 h-12 rounded-lg px-4 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                >
                  <option value="">Choose Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-900 block">
                Height
              </label>
              <input
                type="text"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="177cm"
                className="w-full bg-white border border-gray-100 h-12 rounded-lg px-4 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-900 block">
                Platelets Type
              </label>
              <input
                type="text"
                value={formData.platelets_type}
                onChange={(e) => setFormData({ ...formData, platelets_type: e.target.value })}
                placeholder="Type"
                className="w-full bg-white border border-gray-100 h-12 rounded-lg px-4 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-semibold disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Sidebar - Ad & Share */}
      <MedicalTestModal />
    </div>
  );
}
