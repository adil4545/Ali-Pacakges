import { useState } from "react";
import { motion } from "framer-motion";

export default function Single_Party() {
  const [party, setParty] = useState("");
  const [saleType, setSaleType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`
      Selected Party: ${party}
      Sale Type: ${saleType}
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
        Sales Tax Register (Single Party)
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Select Party/Customer */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Select Party/Customer
          </label>
          <select
            value={party}
            onChange={(e) => setParty(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600"
          >
            <option value="">-- Select --</option>
            <option value="OSAKA STEEL">OSAKA STEEL</option>
            <option value="SUNRISE TRADERS">SUNRISE TRADERS</option>
            <option value="PAK CEMENT">PAK CEMENT</option>
          </select>
        </div>

        {/* Sale Type */}
        <div>
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

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-900 text-white font-semibold rounded-md shadow hover:opacity-90 transition"
          >
            Find
          </motion.button>
        </div>
      </form>
    </div>
  );
}
