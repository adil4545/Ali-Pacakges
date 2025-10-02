import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import type { Party } from "../../Types/Party";
import { Textarea } from "@headlessui/react";
import Button from "../../Components/UI/Button";

export default function AddParty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Party>({
    ntn: "",
    partyName: "",
    partyType: "",
    phone: "",
    cnic: "",
    strn: "",
    registrationNo: "",
    province: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Party saved successfully!");
    navigate("/AdminDashBoardLayout/Parties");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md w-full mt-3 mb-6 mx-4 p-6">
        {/* Top Section */}
        <div className="mb-4 ml-2">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            Add Party
          </h1>
          <hr className="mt-2 border-gray-300" />
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            {/* NTN */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> NTN
              </label>
              <input
                type="text"
                name="ntn"
                value={formData.ntn}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter NTN"
                required
              />
            </div>

            {/* Party Name */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Party Name
              </label>
              <input
                type="text"
                name="partyName"
                value={formData.partyName}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter Party Name"
                required
              />
            </div>

            {/* Party Type */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Party Type
              </label>
              <select
                name="partyType"
                value={formData.partyType}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                required
              >
                <option value="">Select Type</option>
                <option value="Customer">Customer</option>
                <option value="Supplier">Supplier</option>
              </select>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Phone Number
              </label>
              <PhoneInput
                country={"pk"} // Default Pakistan
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputClass="!w-full !h-10"
                inputStyle={{ width: "100%" }}
                enableSearch={false} // search disable
                disableDropdown={true}
              />
            </div>

            {/* CNIC */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> CNIC
              </label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

                  // Limit to max 13 digits
                  if (value.length > 13) value = value.slice(0, 13);

                  // Add dashes automatically: xxxxx-xxxxxxx-x
                  let formatted = value;
                  if (value.length > 5 && value.length <= 12) {
                    formatted = value.slice(0, 5) + "-" + value.slice(5);
                  } else if (value.length > 12) {
                    formatted =
                      value.slice(0, 5) +
                      "-" +
                      value.slice(5, 12) +
                      "-" +
                      value.slice(12);
                  }

                  setFormData({ ...formData, cnic: formatted });
                }}
                placeholder="xxxxx-xxxxxxx-x"
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                required
              />
            </div>

            {/* STRN */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> STRN
              </label>
              <input
                type="text"
                name="strn"
                value={formData.strn}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter STRN"
                required
              />
            </div>

            {/* Registration No. */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Registration No.
              </label>
              <input
                type="text"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter Registration No."
                required
              />
            </div>

            {/* Province */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Province
              </label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                required
              >
                <option value="">Select Province</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="KPK">KPK</option>
                <option value="Balochistan">Balochistan</option>
                <option value="GB">Gilgit Baltistan</option>
              </select>
            </div>

            {/* Address (Full Width) */}
            <div className="flex flex-col col-span-2">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Address
              </label>
              <Textarea
                name="address"
                value={formData.address}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 w-full"
                placeholder="Enter Address"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button onClick={() => navigate("../Parties")}>Cancel</Button>
            <Button>Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
