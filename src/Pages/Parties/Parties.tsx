import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaSearch, FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { message } from "antd";
import Button from "../../Components/UI/Button";
import {
  useGetAllPartiesQuery,
  useDeletePartyMutation,
} from "../../api/Partyapi";
import type { Party } from "../../Types/Party";

export default function Parties() {
  const navigate = useNavigate();

  // 🔹 Fetch all parties
  const { data, isLoading, isError, refetch } = useGetAllPartiesQuery();

  // 🔹 Delete party mutation
  const [deleteParty] = useDeletePartyMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // ✅ Delete handler
  const handleDelete = async (id: string | number) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this party?"
      );
      if (!confirm) return;

      const response = await deleteParty(String(id)).unwrap();
      message.success(response?.message || "Party deleted successfully!");
      refetch(); // refresh list
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete party!");
    }
  };

  // ✅ Handle loading / error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-amber-700 font-semibold">
        Loading Parties...
      </div>
    );
  }

  if (isError || !data?.data?.length) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-gray-500">
        <FaBoxOpen size={40} className="mb-2 text-gray-400 animate-pulse" />
        No parties found
        <Button onClick={() => navigate("../add-party")} className="mt-4">
          Add New Party
        </Button>
      </div>
    );
  }

  // ✅ Filter by search
  const filteredData = data.data.filter(
    (item: Party) =>
      item.ntn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.party_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="mx-2 my-2 mb-4 bg-gray-50 rounded-lg shadow-md p-6 flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent"
        >
          Manage Parties
        </motion.h1>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search by NTN or Party Name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </motion.div>

          {/* Add Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => navigate("../add-party")}>Add Party</Button>
          </motion.div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">NTN</th>
              <th className="p-3 text-left">Party Type</th>
              <th className="p-3 text-left">Party Name</th>
              <th className="p-3 text-left">Registration Type</th>
              <th className="p-3 text-left">Province</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item: Party, index: number) => (
              <motion.tr
                key={item.id}
                className="border-b hover:bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <td className="p-3">{indexOfFirst + index + 1}</td>
                <td className="p-3">{item.ntn}</td>
                <td className="p-3">{String(item.party_type)}</td>
                <td className="p-3">{item.party_name}</td>
                <td className="p-3">{item.registration_type}</td>
                <td className="p-3">{String(item.province)}</td>
                <td className="p-3 flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(`/admin/edit-party/${item.id}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaRegEdit size={20} />
                  </motion.button>

                  <motion.button
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleDelete(item.id!)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaRegTrashAlt size={20} />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-6 pr-2">
          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1
                  ? "text-gray-400"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              <MdNavigateBefore size={22} />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  Math.abs(page - currentPage) <= 1 ||
                  page === 1 ||
                  page === totalPages
              )
              .map((page, i, arr) => (
                <div key={page} className="flex items-center">
                  <button
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page
                        ? "bg-amber-700 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                  {i < arr.length - 1 && arr[i + 1] !== page + 1 && (
                    <span className="px-1">...</span>
                  )}
                </div>
              ))}

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              <MdNavigateNext size={22} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
