// AddAdmin.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { message } from "antd";
import { useAddAdminMutation } from "../../../api/Superadminapi"; // ✅ adjust path
import type { UserProfile } from "../../../Types/Profile";
import Button from "../../UI/Button";

export default function AddAdmin() {
  const navigate = useNavigate();
  const [addAdmin, { isLoading }] = useAddAdminMutation();

  const [formData, setFormData] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "male",
    sellerBusinessName: "",
    role: "admin",
    status: "active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.phone) {
      message.error("❌ Phone number is required!");
      return;
    }

    try {
      await addAdmin({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone.toString(),
        gender: formData.gender,
        sellerBusinessName: formData.sellerBusinessName,
        role: "admin",
        status: "active",
      }).unwrap();

      message.success("✅ Admin added successfully!");
      navigate("/SuperAdmin/admins");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      message.error(err?.data?.message || "❌ Failed to add admin. Try again!");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-start py-10">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md w-full max-w-4xl p-6">
        {/* Header */}
        <div className="mb-4 ml-2">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            Add Admin
          </h1>
          <hr className="mt-2 border-gray-300" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
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
                name="last_name"
                value={formData.last_name}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter Email"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Phone Number
              </label>
              <PhoneInput
                country="pk"
                value={formData.phone ? formData.phone.toString() : ""}
                onChange={(phone: string) =>
                  setFormData({ ...formData, phone })
                }
                inputClass="!w-full !h-10"
                enableSearch={true}
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Gender
              </label>
              <select
                name="gender"
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
                name="sellerBusinessName"
                value={formData.sellerBusinessName}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter Company Name"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button onClick={() => navigate("/SuperAdmin/admins")}>
              Cancel
            </Button>
            <Button disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
