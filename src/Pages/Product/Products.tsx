import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaSearch, FaBoxOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();

  const [data, setData] = useState([
    {
      id: 1,
      hscode: "1001",
      product: "Paper Roll",
      uom: "Kg",
      price: "500",
      action: "Active",
    },
    {
      id: 2,
      hscode: "1002",
      product: "Carton Box",
      uom: "Piece",
      price: "1200",
      action: "Inactive",
    },
    {
      id: 3,
      hscode: "1003",
      product: "Plastic Sheet",
      uom: "Sheet",
      price: "800",
      action: "Active",
    },
    {
      id: 4,
      hscode: "1004",
      product: "Paper Bag",
      uom: "Piece",
      price: "300",
      action: "Active",
    },
    {
      id: 5,
      hscode: "1004",
      product: "Paper Bag",
      uom: "Piece",
      price: "300",
      action: "Active",
    },
    {
      id: 6,
      hscode: "1004",
      product: "Paper Bag",
      uom: "Piece",
      price: "300",
      action: "Active",
    },
    {
      id: 7,
      hscode: "1004",
      product: "Paper Bag",
      uom: "Piece",
      price: "300",
      action: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const filteredData =
    searchTerm.trim() === ""
      ? data
      : data.filter((item) => item.id.toString() === searchTerm.trim());

  return (
    <div className="mx-2 my-2 mb-4bg-gray-50 rounded-lg shadow-md p-6 flex flex-col">
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 mb-10">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
          Manage Product
        </h1>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Add Button */}
          <Link
            to="/admin/add-product"
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-900 text-white hover:opacity-90 transition font-semibold rounded-md shadow hover:opacity-90 transition"
          >
            Add Product
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="p-3 text-left">SERIAL#</th>
              <th className="p-3 text-left">HSCODE</th>
              <th className="p-3 text-left">FBR Product</th>
              <th className="p-3 text-left">UOM</th> {/* New UOM Column */}
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{item.hscode}</td>
                  <td className="p-3">{item.product}</td>
                  <td className="p-3">{item.uom}</td> {/* UOM data */}
                  <td className="p-3">{item.price}</td>
                  <td className="p-3 flex gap-4">
                    <button
                      onClick={() =>
                        navigate(`/AdminDashBoardLayout/EditProduct/${item.id}`)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaRegEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaRegTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-10">
                  <div className="flex flex-col items-center text-gray-500">
                    <FaBoxOpen size={40} className="mb-2 text-gray-400" />
                    No products found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
