import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select, { type SingleValue } from "react-select";
import Button from "../../Components/UI/Button";
import { useGetHSCodeListQuery } from "../../api/ProductsApi";
import type { products } from "../../Types/Products";

type OptionType = {
  value: string | number;
  label: string; // dropdown ke liye
};

export default function AddProduct() {
  const navigate = useNavigate();

  const { data: rawHsCodes, isLoading, isError } = useGetHSCodeListQuery();

  // API response ko products type me map karo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hsCodes: products[] | undefined = rawHsCodes?.map((item: any) => ({
    id: 0,
    hscode: item.hS_CODE,
    productName: item.description,
    uom: item.uom || "",
    tax: item.tax || "",
  }));

  const [form, setForm] = useState<products>({
    id: 0,
    hscode: "",
    productName: "",
    units: "",
    uom: "",
    salePrice: "",
    otherType: "",
    tax: "",
  });

  // react-select ke liye options
  const hsOptions: OptionType[] =
    hsCodes?.map((p) => ({
      value: p.hscode ?? "", // agar undefined/null hai to empty string daal do
      label: `${p.hscode ?? ""} - ${p.productName ?? ""}`,
    })) || [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md w-full mt-3 mb-6 mx-4 p-6">
        <div className="mb-4 ml-2">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
            Add Product
          </h1>
          <hr className="mt-2 border-gray-300" />
        </div>

        <form className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            {/* HS Code Select */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> HS Code
              </label>
              <Select<OptionType, false>
                options={hsOptions}
                isLoading={isLoading}
                isDisabled={isError}
                value={
                  form.hscode
                    ? { value: form.hscode, label: `${form.hscode}` } // box me sirf HS Code
                    : null
                }
                onChange={(selected: SingleValue<OptionType>) => {
                  const found = hsCodes?.find(
                    (p) => p.hscode === selected?.value
                  );
                  if (found) {
                    setForm({
                      ...form,
                      hscode: found.hscode,
                      productName: found.productName || "",
                    });
                  }
                }}
                placeholder="Select HS Code"
                // dropdown me full label show hoga, box me sirf HS code
                formatOptionLabel={(option, { context }) =>
                  context === "menu" ? option.label : option.value
                }
                styles={{
                  menu: (base) => ({ ...base, zIndex: 9999 }),
                  singleValue: (base) => ({
                    ...base,
                    fontWeight: "600",
                    color: "#000",
                  }),
                }}
              />
            </div>

            {/* Product Name */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                <span className="text-red-600">*</span> FBR Product
              </label>
              <input
                type="text"
                value={form.productName}
                readOnly
                className="border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed truncate"
                title={form.productName}
              />
            </div>
          </div>

          {/* UOM + Tax */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Product UOM
              </label>
              <input
                type="text"
                value={form.uom}
                onChange={(e) => setForm({ ...form, uom: e.target.value })}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Tax (%)</label>
              <input
                type="text"
                value={form.tax}
                onChange={(e) => setForm({ ...form, tax: e.target.value })}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>
          </div>

          {/* Sale Price + Other Type */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Sale Price
              </label>
              <input
                type="number"
                value={form.salePrice}
                onChange={(e) =>
                  setForm({ ...form, salePrice: e.target.value })
                }
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Other Type
              </label>
              <input
                type="text"
                value={form.otherType}
                onChange={(e) =>
                  setForm({ ...form, otherType: e.target.value })
                }
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button onClick={() => navigate("../Products")}>Cancel</Button>
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
