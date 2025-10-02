import { useState, useRef, useEffect } from "react";
import { FaUpload, FaUserCircle } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import type { Province, UserProfile } from "../../Types/Profile";
import Button from "../UI/Button";
import { useGetProvinceQuery } from "../../api/usersApi";

// ✅ Province ka interface API ke response ke hisaab se

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Provinces API se fetch
  const { data: provinces, isLoading, isError } = useGetProvinceQuery();

  // ✅ Debugging ke liye API ka data dekhna
  useEffect(() => {
    if (provinces) {
      console.log("Provinces from API:", provinces);
    }
  }, [provinces]);

  // ✅ Default User Data
  const userData: UserProfile = {
    firstName: "Ali",
    lastName: "Khan",
    email: "ali.khan@example.com",
    phone: "923222222222222",
    role: "Admin",
    status: "Active",
    gender: "Male",
    businessName: "ALI Packages",
    ntn: "123456789",
    address: "Lahore, Pakistan",
    profilePic: "",
  };

  const [formData, setFormData] = useState<UserProfile>(userData);

  // ✅ Handle profile picture upload
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePic: previewUrl });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="bg-white w-full p-8 shadow rounded-lg">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-12">
          {formData.profilePic ? (
            <img
              src={formData.profilePic}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-amber-600 shadow"
            />
          ) : (
            <FaUserCircle className="w-28 h-28 text-gray-400" />
          )}

          <div className="mt-6">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="mt-16 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-900 text-white rounded-lg shadow hover:opacity-90 transition"
            >
              <FaUpload /> Update Profile Picture
            </Button>
          </div>
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleProfilePicChange}
          />
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                <span className="text-red-600">*</span> First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                <span className="text-red-600">*</span> Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                <span className="text-red-600">*</span> Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                <span className="text-red-600">*</span> Phone Number
              </label>
              <PhoneInput
                country={"pk"}
                value={formData.phone}
                onChange={(phone: string) =>
                  setFormData({ ...formData, phone })
                }
                inputClass="!w-full !h-10 !text-base !pl-12 border rounded focus:ring-2 focus:ring-amber-600 outline-none"
                buttonClass="!border !border-gray-300"
                dropdownClass="!bg-white !shadow-lg"
                enableSearch={true}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                <span className="text-red-600">*</span> Role
              </label>
              <input
                type="text"
                value={formData.role}
                disabled
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                <span className="text-red-600">*</span> Status
              </label>
              <input
                type="text"
                value={formData.status}
                disabled
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                <span className="text-red-600">*</span> Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value as UserProfile["gender"],
                  })
                }
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">
                <span className="text-red-600">*</span> Seller Business Name
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                <span className="text-red-600">*</span> Seller NTN/CNIC
              </label>
              <input
                type="text"
                value={formData.ntn}
                onChange={(e) =>
                  setFormData({ ...formData, ntn: e.target.value })
                }
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                <span className="text-red-600">*</span> Seller Province
              </label>
              <select
                value={formData.province?.stateProvinceDesc || ""}
                onChange={(e) => {
                  const selected = provinces?.find(
                    (prov) => prov.stateProvinceDesc === e.target.value
                  );
                  if (selected) {
                    setFormData({ ...formData, province: selected });
                  }
                }}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
              >
                <option value="">Select Province</option>
                {isLoading && <option>Loading...</option>}
                {isError && <option>Error loading provinces</option>}
                {provinces &&
                  provinces.map((prov: Province) => (
                    <option
                      key={prov.stateProvinceCode}
                      value={prov.stateProvinceDesc}
                    >
                      {prov.stateProvinceDesc}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-1">
              <span className="text-red-600">*</span> Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              rows={4}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Link
              to="/admin/dashboard"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-900 text-white shadow hover:opacity-90"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-900 text-white shadow hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
