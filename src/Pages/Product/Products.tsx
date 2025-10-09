import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaSearch, FaBoxOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Modal, Button } from "antd";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../api/ProductsApi";

export default function Products() {
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [alertMessage, setAlertMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const showDeleteModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteProduct(selectedId).unwrap();
      setAlertType("success");
      setAlertMessage("Product deleted successfully!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      refetch();
    } catch {
      setAlertType("error");
      setAlertMessage("Failed to delete product!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } finally {
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  const filteredData =
    searchTerm.trim() === ""
      ? data?.data || []
      : (data?.data || []).filter((item) =>
          item.hs_code.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="mx-2 my-2 mb-4 bg-gray-50 rounded-lg shadow-md p-6 flex flex-col relative">
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-24 left-1/2 -translate-x-1/ shadow-md rounded-lg px-6 py-3 flex items-center gap-3 z-50 ${
              alertType === "success"
                ? "bg-white border border-green-300"
                : "bg-red-50 border border-red-300"
            }`}
          >
            {alertType === "success" ? (
              <>
                <CheckCircleOutlined className="text-green-500 text-xl" />
                <span className="text-gray-800 font-medium">
                  {alertMessage}
                </span>
              </>
            ) : (
              <>
                <CloseCircleOutlined className="text-red-500 text-xl" />
                <span className="text-gray-800 font-medium">
                  {alertMessage}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between px-4 mb-10">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
          Manage Product
        </h1>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by HS Code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Add Product Button */}
          <Link
            to="/admin/add-product"
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-900 text-white hover:opacity-90 transition font-semibold rounded-md shadow"
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
              <th className="p-3 text-left">UOM</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Tax (%)</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-red-500">
                  Failed to load products
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{item.hs_code}</td>
                  <td className="p-3">{item.fbr_product}</td>
                  <td className="p-3">{item.product_uom}</td>
                  <td className="p-3">{item.sale_price}</td>
                  <td className="p-3">{item.tax}</td>
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
                      onClick={() => showDeleteModal(String(item.id))}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaRegTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-10">
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

      {/* ✅ Delete Confirmation Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        closable={false}
        maskClosable={true}
      >
        <div className="flex flex-col items-center text-center p-4">
          <ExclamationCircleOutlined className="text-red-500 text-4xl mb-3" />
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Delete Product
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button
              danger
              type="primary"
              onClick={handleConfirmDelete}
              className="bg-red-600"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
