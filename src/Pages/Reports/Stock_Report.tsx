import { useState } from "react";
import { motion } from "framer-motion";

export default function Stock_Report() {
  const [item, setItem] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`
      Selected Item: ${item}
      From: ${fromDate}
      To: ${toDate}
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
       Stock Report
      </motion.h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Select Item (Full width) */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Select Item</label>
          <select
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600"
          >
            <option value="">-- Select --</option>
            <option value="Steel">Steel</option>
            <option value="Cement">Cement</option>
            <option value="Bricks">Bricks</option>
            <option value="Iron">Iron</option>
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
