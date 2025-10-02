import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaSearch, FaBoxOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Purchase_Tax_List() {
  const [data, setData] = useState([
    {
      id: 1,
      date: "2025-09-01",
      voucherNo: "VCH-001",
      exTax: 5000,
      tax: 800,
      incVal: 5800,
      party: "ABC Traders",
      partyNTN: "1234567",
    },
    {
      id: 2,
      date: "2025-09-03",
      voucherNo: "VCH-002",
      exTax: 10000,
      tax: 1600,
      incVal: 11600,
      party: "XYZ Enterprises",
      partyNTN: "9876543",
    },
    {
      id: 3,
      date: "2025-09-05",
      voucherNo: "VCH-003",
      exTax: 7500,
      tax: 1200,
      incVal: 8700,
      party: "Al-Noor Pvt Ltd",
      partyNTN: "4567890",
    },
    {
      id: 4,
      date: "2025-09-07",
      voucherNo: "VCH-004",
      exTax: 2000,
      tax: 320,
      incVal: 2320,
      party: "Metro Pvt Ltd",
      partyNTN: "1112223",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // delete function
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmDelete) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  // search filter
  const filteredData =
    searchTerm.trim() === ""
      ? data
      : data.filter(
          (item) =>
            item.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.partyNTN.includes(searchTerm.trim())
        );

  // pagination logic
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="mx-2 my-2 mb-4 bg-gray-50 rounded-lg shadow-md p-6 flex flex-col">
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent"
        >
          Purchase Tax List
        </motion.h1>

        <div className="flex items-center gap-3">
          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search by Voucher, Party or NTN..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </motion.div>

          {/* Add Purchase Tax Invoice Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/admin/purchase-tax-invoice"
              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-900 text-white font-semibold rounded-md shadow hover:opacity-90 transition"
            >
              Add Purchase Tax Invoice
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="p-3 text-left">SERIAL#</th>
              <th className="p-3 text-left">DATE</th>
              <th className="p-3 text-left">VOUCHER NO</th>
              <th className="p-3 text-left">EX.TAX VALUE</th>
              <th className="p-3 text-left">TAX VALUE</th>
              <th className="p-3 text-left">INC. VAL</th>
              <th className="p-3 text-left">PARTY</th>
              <th className="p-3 text-left">PARTY NTN</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <td className="p-3">{indexOfFirst + index + 1}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.voucherNo}</td>
                  <td className="p-3">{item.exTax}</td>
                  <td className="p-3">{item.tax}</td>
                  <td className="p-3">{item.incVal}</td>
                  <td className="p-3">{item.party}</td>
                  <td className="p-3">{item.partyNTN}</td>
                  <td className="p-3 flex gap-4">
                    {/* Edit Button */}
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => alert(`Edit Voucher: ${item.voucherNo}`)}
                    >
                      <FaRegEdit size={20} />
                    </motion.button>

                    {/* Delete Button */}
                    <motion.button
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaRegTrashAlt size={20} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-10">
                  <div className="flex flex-col items-center text-gray-500">
                    <FaBoxOpen
                      size={40}
                      className="mb-2 text-gray-400 animate-pulse"
                    />
                    No records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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
