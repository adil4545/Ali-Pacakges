import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Combobox,
  ComboboxLabel,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import type { products } from "../../Types/Products";
import Button from "../../Components/UI/Button";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState<products>({
    id: 0,
    hscode: null,
    productName: "",
    uom: "",
    salePrice: "",
    otherType: "",
    tax: "",
  });

  // HS Code options
  const hsCodes = ["1001", "1002", "1003", "2001", "2002", "3001"];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md w-full mt-3 mb-6 mx-4 p-6">
        {/* Top Section */}
        <div className="mb-4 ml-2">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            Add Product
          </h1>
          <hr className="mt-2 border-gray-300" />
        </div>

        {/* Form Section */}
        <form className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            {/* HS Code Combobox */}
            <div className="flex flex-col">
              <Combobox
                value={form.hscode}
                onChange={(value) => setForm({ ...form, hscode: value })}
              >
                <ComboboxLabel className="mb-1 font-medium text-gray-700">
                  <span className="text-red-600">*</span> HS Code
                </ComboboxLabel>

                {/* Input */}
                <ComboboxInput
                  placeholder="Search or select HS Code"
                  onChange={(e) => setForm({ ...form, hscode: e.target.value })}
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 w-full"
                  displayValue={(code: string) => code}
                />

                {/* Options */}
                <ComboboxOptions className="border rounded-md mt-1 bg-white shadow-lg max-h-40 overflow-y-auto z-50">
                  {hsCodes
                    .filter((code) =>
                      code.toLowerCase().includes(form.hscode?.toString() ?? "")
                    )
                    .map((code) => (
                      <ComboboxOption
                        key={code}
                        value={code}
                        className={({ active }) =>
                          `cursor-pointer px-3 py-2 ${
                            active ? "bg-amber-100" : ""
                          }`
                        }
                      >
                        {code}
                      </ComboboxOption>
                    ))}
                </ComboboxOptions>
              </Combobox>
            </div>

            {/* FBR Product */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> FBR Product
              </label>
              <input
                type="text"
                value={form.productName}
                onChange={(e) =>
                  setForm({ ...form, productName: e.target.value })
                }
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter product name"
              />
            </div>

            {/* Product UOM */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Product UOM
              </label>
              <select
                value={form.uom}
                onChange={(e) => setForm({ ...form, uom: e.target.value })}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
              >
                <option value="">Select UOM</option>
                <option value="Kg">Kg</option>
                <option value="Piece">Piece</option>
                <option value="Liter">Liter</option>
              </select>
            </div>

            {/* Sale Price */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Sale Price
              </label>
              <input
                type="number"
                value={form.salePrice}
                onChange={(e) =>
                  setForm({ ...form, salePrice: e.target.value })
                }
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter sale price"
              />
            </div>

            {/* Other Type */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Other Type
              </label>
              <input
                type="text"
                value={form.otherType}
                onChange={(e) =>
                  setForm({ ...form, otherType: e.target.value })
                }
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Enter other type"
              />
            </div>

            {/* Tax */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> Tax
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={form.tax}
                  onChange={(e) => setForm({ ...form, tax: e.target.value })}
                  className="border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 w-full"
                  placeholder="Enter tax"
                />
                <div className="bg-gray-200 border border-gray-300 px-2 py-2 rounded-r-md ml-1">
                  %
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button onClick={() => navigate("../Products")}>Cancel</Button>
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
