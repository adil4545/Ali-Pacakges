import { useState } from "react";
import {
  FaRegTrashAlt,
  FaSearch,
  FaBoxOpen,
  FaPrint,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom"; // 👈 yeh import add kiya

export default function Credit_Note_List() {
  const [data, setData] = useState([
    {
      id: 1,
      date: "2025-09-10",
      invoiceNo: "1000",
      exTax: 12000.0,
      tax: 2160.0,
      qty: 1.0,
      grandTotal: 14160.0,
      party: "OSAKA STEEL PVT LTD",
      posted: false,
    },
    {
      id: 2,
      date: "2025-09-12",
      invoiceNo: "1001",
      exTax: 8000.0,
      tax: 1280.0,
      qty: 2.0,
      grandTotal: 9280.0,
      party: "SUNRISE TRADERS",
      posted: false,
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

  // dummy post to FBR
  const handlePostToFBR = async (id: number) => {
    alert("Posting to FBR...");
    setTimeout(() => {
      setData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, posted: true } : item))
      );
      alert("Successfully posted to FBR!");
    }, 1500);
  };

  // print function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePrint = (item: any) => {
    // 👇 yaha se print ka kaam ho raha
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Invoice - ${item.invoiceNo}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h2 { color: green; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #333; padding: 8px; text-align: left; }
              th { background: #f2f2f2; }
            </style>
          </head>
          <body>
            <h2>Credit Note Invoice</h2>
            <p><strong>Invoice No:</strong> ${item.invoiceNo}</p>
            <p><strong>Date:</strong> ${item.date}</p>
            <p><strong>Party:</strong> ${item.party}</p>
            <table>
              <thead>
                <tr>
                  <th>Ex. Tax Value</th>
                  <th>Tax Value</th>
                  <th>Total Qty</th>
                  <th>Grand Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${item.exTax.toFixed(2)}</td>
                  <td>${item.tax.toFixed(2)}</td>
                  <td>${item.qty.toFixed(2)}</td>
                  <td>${item.grandTotal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <script>
              window.print();
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // search filter
  const filteredData =
    searchTerm.trim() === ""
      ? data
      : data.filter(
          (item) =>
            item.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.party.toLowerCase().includes(searchTerm.toLowerCase())
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
          Credit Note List
        </motion.h1>

        <div className="flex items-center gap-4">
          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search by Invoice or Party..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </motion.div>

          {/* Add Credit Note Button */}
          <Link to="/admin/credit-note">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-900 text-white font-semibold rounded-md shadow hover:opacity-90 transition"
            >
              Add Credit Note
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="p-3 text-left">SR#</th>
              <th className="p-3 text-left">DATE</th>
              <th className="p-3 text-left">INVOICE NO</th>
              <th className="p-3 text-left">EX. TAX VALUE</th>
              <th className="p-3 text-left">TAX VALUE</th>
              <th className="p-3 text-left">TOTAL QTY</th>
              <th className="p-3 text-left">GRAND TOTAL</th>
              <th className="p-3 text-left">PARTY</th>
              <th className="p-3 text-left">PRINT</th>
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
                  <td className="p-3">{item.invoiceNo}</td>
                  <td className="p-3">{item.exTax.toFixed(2)}</td>
                  <td className="p-3">{item.tax.toFixed(2)}</td>
                  <td className="p-3">{item.qty.toFixed(2)}</td>
                  <td className="p-3">{item.grandTotal.toFixed(2)}</td>
                  <td className="p-3">{item.party}</td>
                  <td className="p-3">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handlePrint(item)} // 👈 ab yaha print preview khulega
                    >
                      <FaPrint size={18} />
                    </motion.button>
                  </td>
                  <td className="p-3 flex gap-3 items-center">
                    {/* Delete Button */}
                    <motion.button
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaRegTrashAlt size={20} />
                    </motion.button>

                    {/* Post to FBR */}
                    {item.posted ? (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <FaCheckCircle /> Posted
                      </span>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-xs bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        onClick={() => handlePostToFBR(item.id)}
                      >
                        Post to FBR
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="py-10">
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
                        ? "bg-green-700 text-white"
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
