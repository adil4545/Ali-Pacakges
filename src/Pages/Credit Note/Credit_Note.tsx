import { useState } from "react";
import type { Party } from "../../Types/Party";
import type { products } from "../../Types/Products";
import type { Invoice } from "../../Types/Invoice";
import Button from "../../Components/UI/Button";
export default function Credit_Note() {
  // Parties Dummy Data
  const parties: Party[] = [
    {
      id: 1,
      partyName: "ABC Traders",
      address: "Lahore",
      ntn: "1234567",
      province: "Punjab",
    },
    {
      id: 2,
      partyName: "XYZ Enterprises",
      address: "Karachi",
      ntn: "9876543",
      province: "Sindh",
    },
  ];

  // Products Dummy Data
  const products: products[] = [
    { id: 1, productName: "Product A", units: "Box" },
    { id: 2, productName: "Product B", units: "Kg" },
  ];

  // Invoice form data
  const [formData, setFormData] = useState<Invoice>({
    date: "",
    voucherNo: "",
    remarks: "",
    pOrder: "",
    invoiceNo: "",
    address: "",
    ntn: "",
    province: "",
    quantity: 0,
    valueExTax: 0,
    price: 0,
    stPercent: 0,
    valueIncTax: 0,
    taxValue: 0,
    party: undefined,
    products: undefined,
  });

  // Product rows
  const [productRows, setProductRows] = useState<Invoice[]>([]);

  // Totals
  const totalQuantity = productRows.reduce(
    (acc, row) => acc + (row.quantity || 0),
    0
  );
  const totalTax = productRows.reduce(
    (acc, row) => acc + (row.taxValue || 0),
    0
  );
  const totalExTax = productRows.reduce(
    (acc, row) => acc + (row.valueExTax || 0),
    0
  );
  const totalIncTax = productRows.reduce(
    (acc, row) => acc + (row.valueIncTax || 0),
    0
  );

  // Handle Party Select
  const handlePartyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const partyId = Number(e.target.value);
    const selected = parties.find((p) => p.id === partyId);
    if (!selected) return;
    setFormData({
      ...formData,
      party: selected,
      address: selected.address,
      ntn: selected.ntn,
      province: selected.province,
    });
  };

  // Add Product Row
  const addProductRow = () => {
    setProductRows([
      ...productRows,
      {
        hscode: 0,
        productId: 0,
        units: "",
        quantity: 0,
        price: 0,
        stPercent: 0,
        taxValue: 0,
        valueExTax: 0,
        valueIncTax: 0,
        party: formData.party,
        products: undefined,
        date: "",
        voucherNo: "",
        remarks: "",
        pOrder: "",
        invoiceNo: "",
        address: "",
        ntn: "",
        province: "",
      },
    ]);
  };

  // Update Product Row
  const updateProductRow = <K extends keyof Invoice>(
    index: number,
    field: K,
    value: Invoice[K]
  ) => {
    const updated = [...productRows];
    updated[index] = { ...updated[index], [field]: value };

    // Auto calculations
    const qty = updated[index].quantity || 0;
    const price = updated[index].price || 0;
    const stPercent = updated[index].stPercent || 0;

    updated[index].valueExTax = qty * price;
    updated[index].taxValue = (updated[index].valueExTax * stPercent) / 100;
    updated[index].valueIncTax =
      updated[index].valueExTax + updated[index].taxValue;

    setProductRows(updated);
  };

  // Remove Product Row
  const removeProductRow = (index: number) => {
    setProductRows(productRows.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Credit Note Saved:", { formData, productRows });
    alert("Credit Note Invoice Saved!");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Invoice Info */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent mb-4">
            Credit Note
          </h1>

          <div className="grid grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block font-medium mb-1">
                <span className="text-red-600">*</span> Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
                required
              />
            </div>

            {/* Select Party */}
            <div>
              <label className="block font-medium mb-1">
                <span className="text-red-600">*</span> Select Party
              </label>
              <select
                onChange={handlePartyChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
                required
              >
                <option value="">Select Party</option>
                {parties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.partyName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address, NTN, Province */}
          <div className="grid grid-cols-3 gap-6 mt-4">
            <div>
              <label className="block font-medium mb-1">Address</label>
              <input
                type="text"
                value={formData.address}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Seller NTN/CNIC</label>
              <input
                type="text"
                value={formData.ntn}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Province</label>
              <input
                type="text"
                value={formData.province}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent mb-4">
            Product Details
          </h2>
          {productRows.length === 0 ? (
            <button
              type="button"
              onClick={addProductRow}
              className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-900 text-white font-semibold rounded"
            >
              + Add Product
            </button>
          ) : (
            <div className="space-y-4">
              {productRows.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-start"
                >
                  {/* HS Code */}
                  <div className="flex flex-col col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                      HS Code
                    </label>
                    <input
                      type="number"
                      value={row.hscode ?? ""}
                      onChange={(e) =>
                        updateProductRow(
                          index,
                          "hscode",
                          Number(e.target.value)
                        )
                      }
                      className="border rounded px-2 py-1"
                    />
                  </div>

                  {/* Product */}
                  <div className="flex flex-col col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                      Product
                    </label>
                    <select
                      value={row.products?.id ?? 0}
                      onChange={(e) => {
                        const prod = products.find(
                          (p) => p.id === Number(e.target.value)
                        );
                        updateProductRow(index, "products", prod as products);
                        updateProductRow(index, "units", prod?.units ?? "");
                      }}
                      className="border rounded px-2 py-1"
                    >
                      <option value={0}>Select</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.productName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Units */}
                  <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium text-gray-700">
                      Units
                    </label>
                    <input
                      type="text"
                      value={row.units ?? ""}
                      readOnly
                      className="border rounded px-2 py-1 bg-gray-100"
                    />
                  </div>

                  {/* Qty */}
                  <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium text-gray-700">
                      Qty
                    </label>
                    <input
                      type="number"
                      value={row.quantity ?? ""}
                      onChange={(e) =>
                        updateProductRow(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      className="border rounded px-2 py-1"
                    />
                  </div>

                  {/* Price */}
                  <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      value={row.price ?? ""}
                      onChange={(e) =>
                        updateProductRow(index, "price", Number(e.target.value))
                      }
                      className="border rounded px-2 py-1"
                    />
                  </div>

                  {/* S.T% */}
                  <div className="flex flex-col col-span-1">
                    <label className="text-sm font-medium text-gray-700">
                      S.T%
                    </label>
                    <input
                      type="number"
                      value={row.stPercent ?? ""}
                      onChange={(e) =>
                        updateProductRow(
                          index,
                          "stPercent",
                          Number(e.target.value)
                        )
                      }
                      className="border rounded px-2 py-1"
                    />
                  </div>

                  {/* Tax, Ex-Tax, Inc-Tax */}
                  {/* Tax, Ex-Tax, Inc-Tax */}
                  <div className="flex flex-col col-span-3 space-y-1">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">
                        Tax
                      </label>
                      <input
                        type="number"
                        value={row.taxValue ?? 0}
                        readOnly
                        className="border rounded px-2 py-1 bg-gray-100"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">
                        Ex-Tax
                      </label>
                      <input
                        type="number"
                        value={row.valueExTax ?? 0}
                        readOnly
                        className="border rounded px-2 py-1 bg-gray-100"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">
                        Inc-Tax
                      </label>
                      <input
                        type="number"
                        value={row.valueIncTax ?? 0}
                        readOnly
                        className="border rounded px-2 py-1 bg-gray-100"
                      />
                    </div>
                  </div>

                  {/* Delete */}
                  <div className="flex flex-col justify-end col-span-1">
                    <button
                      type="button"
                      onClick={() => removeProductRow(index)}
                      className="bg-red-500 text-white font-bold px-2 py-1 rounded hover:bg-red-600"
                    >
                      DLT
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addProductRow}
                className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-900 text-white font-semibold rounded"
              >
                + Add Product
              </button>
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent mb-4">
            Totals
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label>Total Quantity</label>
              <input
                type="number"
                value={totalQuantity}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label>Total Tax</label>
              <input
                type="number"
                value={totalTax}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label>Value Ex-Tax</label>
              <input
                type="number"
                value={totalExTax}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label>Value Inc-Tax</label>
              <input
                type="number"
                value={totalIncTax}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button>Submit Credit Note</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
