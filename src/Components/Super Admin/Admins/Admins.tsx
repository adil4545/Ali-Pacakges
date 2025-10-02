import { useState } from "react";
import { FaRegTrashAlt, FaSearch, FaBoxOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
export default function Admins() {
  const [data, setData] = useState([
    {
      id: 1,
      firstName: "Ali",
      lastName: "Khan",
      email: "ali@example.com",
      phone: "03001234567",
      gender: "Male",
      company: "ABC Corp",
    },
    {
      id: 2,
      firstName: "Sara",
      lastName: "Ahmed",
      email: "sara@example.com",
      phone: "03111234567",
      gender: "Female",
      company: "XYZ Pvt Ltd",
    },
    {
      id: 3,
      firstName: "Usman",
      lastName: "Malik",
      email: "usman@example.com",
      phone: "03221234567",
      gender: "Male",
      company: "Metro Group",
    },
    {
      id: 4,
      firstName: "Ayesha",
      lastName: "Hassan",
      email: "ayesha@example.com",
      phone: "03331234567",
      gender: "Female",
      company: "Super Mart",
    },
  ]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // ✅ delete function
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );
    if (confirmDelete) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  // ✅ search filter
  const filteredData =
    searchTerm.trim() === ""
      ? data
      : data.filter(
          (item) =>
            item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // ✅ pagination logic
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
          Manage Admins
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
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset page on search
              }}
              className="pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </motion.div>

          {/* Add Admin Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => navigate("/super-admin/add-admin")}>
              Add Admin
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="p-3 text-left">#Serial</th>
              <th className="p-3 text-left">First Name</th>
              <th className="p-3 text-left">Last Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone Number</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Company Name</th>
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
                  <td className="p-3">{item.firstName}</td>
                  <td className="p-3">{item.lastName}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3">{item.gender}</td>
                  <td className="p-3">{item.company}</td>
                  <td className="p-3">
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
                <td colSpan={8} className="py-10">
                  <div className="flex flex-col items-center text-gray-500">
                    <FaBoxOpen
                      size={40}
                      className="mb-2 text-gray-400 animate-pulse"
                    />
                    No admins found
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
