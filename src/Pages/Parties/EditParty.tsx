import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import type { Party } from "../../Types/Party";
import Button from "../../Components/UI/Button";

export default function EditParty() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<Party>({
    id: Number(id),
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

  // Simulate fetching from localStorage (replace with API)
  useEffect(() => {
    const storedParties: Party[] = JSON.parse(
      localStorage.getItem("parties") || "[]"
    );
    const party = storedParties.find((p) => p.id === Number(id));

    if (party) {
      setFormData(party);
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let storedParties: Party[] = JSON.parse(
      localStorage.getItem("parties") || "[]"
    );

    storedParties = storedParties.map((p) =>
      p.id === Number(id) ? { ...p, ...formData } : p
    );

    localStorage.setItem("parties", JSON.stringify(storedParties));

    alert("Party updated successfully!");
    navigate("/AdminDashBoardLayout/Parties");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md w-full mt-3 mb-6 mx-4 p-6">
        {/* Top Section */}
        <div className="mb-4 ml-2">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            Edit Party
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

            {/* Phone */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Phone Number
              </label>
              <PhoneInput
                country={"pk"}
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputClass="!w-full !h-10"
                inputStyle={{ width: "100%" }}
                enableSearch={false}
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
                onChange={handleChange}
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

            {/* Address */}
            <div className="flex flex-col col-span-2">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 w-full"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button onClick={() => navigate("../Parties")}>Cancel</Button>
            <Button>Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
