import { useState } from "react";
import { motion } from "framer-motion";

export default function All_Party() {
  const [saleType, setSaleType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportType, setReportType] = useState("detail");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`
      Sale Type: ${saleType}
      From: ${fromDate}
      To: ${toDate}
      Report Type: ${reportType}
    `);
  };

  return (
    <div className="mx-4 my-6 p-6 bg-gray-50 rounded-lg shadow-md">
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl mb-4 font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent"
      >
        Sales Tax Register (All Parties)
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Sale Type (Full width) */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">
            Sale Type
          </label>
          <select
            value={saleType}
            onChange={(e) => setSaleType(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600"
          >
            <option value="">-- Select --</option>
            <option value="Taxable">Taxable</option>
            <option value="Exempt">Exempt</option>
            <option value="Export">Export</option>
          </select>
        </div>

        {/* From Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Report Type (Radio buttons full row) */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">
            Report Type
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="reportType"
                value="detail"
                checked={reportType === "detail"}
                onChange={(e) => setReportType(e.target.value)}
              />
              Detail
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="reportType"
                value="summary"
                checked={reportType === "summary"}
                onChange={(e) => setReportType(e.target.value)}
              />
              Summary
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="reportType"
                value="excel"
                checked={reportType === "excel"}
                onChange={(e) => setReportType(e.target.value)}
              />
              Excel Report
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-900 text-white font-semibold rounded-md shadow hover:opacity-90 transition"
          >
            Find
          </motion.button>
        </div>
      </form>
    </div>
  );
}
