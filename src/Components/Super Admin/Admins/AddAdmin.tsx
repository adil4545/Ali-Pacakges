import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import type { UserProfile } from "../../../Types/Profile";
import Button from "../../UI/Button";

export default function AddAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: " ",
    gender: "Male",
    businessName: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin Data:", formData);
    alert("Admin saved successfully!");
    navigate("/super-admin/admins");
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md w-full mt-4 mx-4 p-6">
        {/* Top Section */}
        <div className="mb-4 ml-2">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            Add Admin
          </h1>
          <hr className="mt-2 border-gray-300" />
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> First Name
              </label>
              <input
                type="text"
                name="FirstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter First Name"
                required
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Last Name
              </label>
              <input
                type="text"
                name="LastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter Last Name"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Email
              </label>
              <input
                type="email"
                name="Email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter Email"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Phone Number
              </label>
              <PhoneInput
                country={"pk"} // Default Pakistan
                value={formData.phone?.toString() ?? ""}
                onChange={(phone) =>
                  setFormData({ ...formData, phone: Number(phone) })
                }
                inputClass="!w-full !h-10"
                inputStyle={{ width: "100%" }}
                enableSearch={true} // allow searching countries
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Gender
              </label>
              <select
                name="Gender"
                value={formData.gender}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>

            {/* Company Name */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Company Name
              </label>
              <input
                type="text"
                name="CompanyName"
                value={formData.businessName}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter Company Name"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button onClick={() => navigate("/super-admin/admins")}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
