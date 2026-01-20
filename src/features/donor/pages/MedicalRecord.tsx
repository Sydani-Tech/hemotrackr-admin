const MedicalRecord = () => {
  return (
    <div className="max-w-4xl mx-auto  animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Medical Record</h2>

      <div className="flex gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-8">
          {/* Donation Information */}
          <div className="bg-gray-100 rounded-2xl p-6">
            <h3 className="text-blue-600 font-bold mb-6 text-sm uppercase tracking-wider">
              DONATION INFORMATION
            </h3>

            <div className="space-y-5">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-700">Blood Donated</span>
                <span className="text-gray-500">1 Pint of blood</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-700">Bone Marrow</span>
                <span className="text-gray-500">1 Bone Marrow</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-700">Platelets</span>
                <span className="text-gray-500">2</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-700">Gender</span>
                <span className="text-gray-500">Male</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2">
                <span className="font-bold text-gray-700">
                  Date of Donation
                </span>
                <span className="text-gray-500">January 37, 1989</span>
              </div>
            </div>
          </div>

          {/* Health Type */}
          <div className="bg-gray-100 rounded-2xl p-6">
            <h3 className="text-blue-600 font-bold mb-6 text-sm uppercase tracking-wider">
              HEALTH TYPE
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-700">Blood Group</span>
                <span className="text-gray-500">O+</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-700">Genotype</span>
                <span className="text-gray-500">AA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Personal Info) - Stays aligned to top */}
        <div className="flex-1 h-fit bg-gray-100 rounded-2xl p-6">
          <h3 className="text-blue-600 font-bold mb-6 text-sm uppercase tracking-wider">
            PERSONAL INFORMATION
          </h3>

          <div className="space-y-5">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-700">First Name</span>
              <span className="text-gray-500">Oluwatosin</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-700">Last Name</span>
              <span className="text-gray-500">Adekunle</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-700">Other Names</span>
              <span className="text-gray-500">Chukwuma</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-700">Gender</span>
              <span className="text-gray-500">Male</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-start">
        <button className="text-blue-500 text-sm hover:underline">
          Updated by BMH Blood Bank
        </button>
      </div>
    </div>
  );
};

export default MedicalRecord;
