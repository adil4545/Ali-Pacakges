import { useState, useMemo, useEffect } from "react";
import { FaRegTrashAlt, FaSearch, FaBoxOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import Button from "../../UI/Button";
import {
  useGetAllAdminsQuery,
  useDeleteAdminMutation,
} from "../../../api/SuperAdminapi";
import type { UserProfile } from "../../../Types/Profile";

export default function Admins() {
  const navigate = useNavigate();

  // ✅ Fetch admins list
  const { data, isLoading, isFetching, refetch } = useGetAllAdminsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();

  // ✅ Extract admin data
  const admins: UserProfile[] = useMemo(() => data?.data ?? [], [data?.data]);

  // ✅ Local state for search
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Always refetch when component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  // ✅ Delete Admin
  const handleDelete = async (id?: string) => {
    if (!id) {
      console.log("Admin ID is missing!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      const res = await deleteAdmin(id).unwrap();
      message.success(res.message || "Admin deleted successfully!");
      refetch(); // refresh list after delete
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      message.error(err?.data?.message || "Failed to delete admin!");
    }
  };

  // ✅ Filtered Data (search by name or email)
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return admins;
    return admins.filter(
      (a) =>
        a.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [admins, searchTerm]);

  // ✅ Debugging console
  useEffect(() => {
    console.log("Admins raw data:", data);
  }, [data, admins, filteredData]);

  // ✅ Loader
  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center h-64 text-amber-700 font-semibold">
        Loading admins...
      </div>
    );
  }

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
          Manage Admins
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
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </motion.div>

          {/* Add Admin Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => navigate("/SuperAdmin/add-admin")}>
              Add Admin
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Admins Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="p-3 text-left">#id</th>
              <th className="p-3 text-left">First Name</th>
              <th className="p-3 text-left">Last Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((admin: UserProfile, index: number) => (
                <motion.tr
                  key={admin.id}
                  className="border-b hover:bg-gray-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <td className="p-3">{admin.id}</td>
                  <td className="p-3">{admin.first_name}</td>
                  <td className="p-3">{admin.last_name}</td>
                  <td className="p-3">{admin.email}</td>
                  <td className="p-3">{admin.phone}</td>
                  <td className="p-3">{admin.gender}</td>
                  <td className="p-3">{admin.sellerBusinessName}</td>
                  <td className="p-3">
                    <motion.button
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      onClick={() => handleDelete(String(admin.id))}
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
    </div>
  );
}
