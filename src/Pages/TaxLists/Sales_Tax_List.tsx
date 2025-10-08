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
import { Link } from "react-router-dom";

export default function Sales_Tax_List() {
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
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  // ✅ Clean & professional print layout

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePrint = async (item: any) => {
    // 1️⃣ Create FBR link
    const qrData = `https://e.fbr.gov.pk/invoice/${item.invoiceNo}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
      qrData
    )}`;

    // 2️⃣ Fetch QR image & convert to Base64
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    const qrBase64: string = await new Promise((resolve) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    // 3️⃣ Print content
    const printWindow = window.open("", "_blank", "width=900,height=1000");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Sales Tax Invoice - ${item.invoiceNo}</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Segoe UI', sans-serif; background: white; color: #111827; }
            .invoice-box { max-width: 800px; margin: auto; padding: 20px; }
            table { width: 100%; border-collapse: collapse; font-size: 13px; }
            th, td { border: 1px solid #d1d5db; padding: 8px; }
            th { background-color: #f9fafb; text-align: center; font-weight: 600; }
            td { text-align: right; }
            td.text-left { text-align: left; }
            .signature-line { border-top: 1px solid #6b7280; width: 180px; margin-top: 40px; }
            .header { text-align: center; margin-bottom: 25px; }
            .header h1 { font-size: 22px; font-weight: 700; color: #111827; }
            .header p { font-size: 13px; color: #374151; }
            .buyer-info { margin-bottom: 20px; font-size: 13px; }
            .totals td { border: none; padding: 4px 8px; }
            .totals tr td:first-child { text-align: left; }
          </style>
        </head>
        <body>
          <div class="invoice-box">

            <!-- Header -->
            <div class="header">
              <h1>DEAZITEACH</h1>
              <p>NTN: 3520281536803 | PHONE: +92 3-- ---------</p>
              <p> Lahore</p>
              <h2 class="text-lg font-semibold underline mt-3">SALES TAX INVOICE</h2>
            </div>

            <!-- Buyer Info -->
            <div class="buyer-info grid grid-cols-2 gap-4">
              <div>
                <p><strong>Buyer Name:</strong> ${item.party}</p>
                <p><strong>Buyer NTN:</strong> 4991899</p>
                <p><strong>Address:</strong> Dummy Address</p>
                <p><strong>Reg Type:</strong> Unregistered</p>
              </div>
              <div class="text-right">
                <p><strong>Invoice #:</strong> ${item.invoiceNo}</p>
                <p><strong>Date:</strong> ${item.date}</p>
              </div>
            </div>

            <!-- Table -->
            <table>
              <thead>
                <tr>
                  <th>Qty</th>
                  <th class="text-left">Description</th>
                  <th>Rate</th>
                  <th>Value Exc. ST</th>
                  <th>S.T%</th>
                  <th>S.T Value</th>
                  <th>Value Inc. ST</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">${item.qty}</td>
                  <td class="text-left">Test Product</td>
                  <td>${item.exTax.toFixed(2)}</td>
                  <td>${item.exTax.toFixed(2)}</td>
                  <td class="text-center">18%</td>
                  <td>${item.tax.toFixed(2)}</td>
                  <td>${item.grandTotal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <!-- Totals -->
            <div class="flex justify-end mt-6">
              <table class="totals">
                <tr><td>Total Exc. ST:</td><td>Rs ${item.exTax.toFixed(
                  2
                )}</td></tr>
                <tr><td>Total Tax:</td><td>Rs ${item.tax.toFixed(2)}</td></tr>
                <tr><td><strong>Total Amount:</strong></td><td><strong>Rs ${item.grandTotal.toFixed(
                  2
                )}</strong></td></tr>
              </table>
            </div>

            <!-- Signature + QR -->
            <div class="flex justify-between items-center mt-12">
              <div>
                <p class="font-medium">Authorized Signature:</p>
                <div class="signature-line"></div>
              </div>

              <div class="text-center">
                <a href="${qrData}" target="_blank">
                  <img src="${qrBase64}" alt="FBR QR Code" class="mx-auto"/>
                </a>
                <p class="text-xs mt-2 text-gray-700 font-medium">FBR Invoice No: ${
                  item.invoiceNo
                }</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="text-center text-xs text-gray-600 mt-10 border-t pt-3">
              THANK YOU FOR YOUR BUSINESS
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  // pagination logic
  const filteredData =
    searchTerm.trim() === ""
      ? data
      : data.filter(
          (item) =>
            item.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.party.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="mx-2 my-2 mb-4 bg-gray-50 rounded-lg shadow-md p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent"
        >
          Sales Tax List
        </motion.h1>

        <div className="flex items-center gap-4">
          <div className="relative">
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
          </div>

          <Link to="/admin/sales-tax-invoice">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-900 text-white font-semibold rounded-md shadow hover:opacity-90 transition"
            >
              Add Sales Tax
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Table */}
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
              <th className="p-3 text-left">ACTIONS</th>
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
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handlePrint(item)}
                    >
                      <FaPrint size={18} />
                    </button>
                  </td>
                  <td className="p-3 flex gap-3 items-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaRegTrashAlt size={20} />
                    </button>

                    {item.posted ? (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <FaCheckCircle /> Posted
                      </span>
                    ) : (
                      <button
                        className="px-3 py-1 text-xs bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        onClick={() => alert("Posting to FBR...")}
                      >
                        Post to FBR
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="py-10 text-center text-gray-500">
                  <FaBoxOpen size={40} className="mx-auto mb-2 text-gray-400" />
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-6 pr-2">
          <div className="flex items-center gap-2">
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
