import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleOutlined } from "@ant-design/icons";
import {
  FaBoxOpen,
  FaUsers,
  FaFileInvoice,
  FaRegCreditCard,
  FaUser,
  FaUsers as FaUsersGroup,
  FaBox,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

function Dashboard() {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (location.state?.loginSuccess) {
      setShowAlert(true);

      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setShowAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const items = [
    {
      name: "Products",
      icon: <FaBoxOpen size={55} />,
      color: "from-blue-400 to-blue-600 text-white",
      link: "/admin/products",
    },
    {
      name: "Parties",
      icon: <FaUsers size={55} />,
      color: "from-green-400 to-green-600 text-white",
      link: "/admin/parties",
    },
    {
      name: "Sales Tax Invoice",
      icon: <FaFileInvoice size={55} />,
      color: "from-purple-400 to-purple-600 text-white",
      link: "/admin/sales-tax-invoice",
    },
    {
      name: "Credit Note",
      icon: <FaRegCreditCard size={55} />,
      color: "from-red-400 to-red-600 text-white",
      link: "/admin/credit-note",
    },
    {
      name: "Single Party Report",
      icon: <FaUser size={55} />,
      color: "from-orange-400 to-orange-600 text-white",
      link: "/admin/single-party",
    },
    {
      name: "All Party Report",
      icon: <FaUsersGroup size={55} />,
      color: "from-teal-400 to-teal-600 text-white",
      link: "/admin/all-party",
    },
    {
      name: "Product Report",
      icon: <FaBox size={55} />,
      color: "from-pink-400 to-pink-600 text-white",
      link: "/admin/product-report",
    },
    {
      name: "Support",
      icon: <MdSupportAgent size={55} />,
      color: "from-yellow-400 to-yellow-600 text-white",
      link: "https://deazitech.com/contact-us-deazitech/",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 py-6 min-h-screen relative">
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg px-6 py-3 flex items-center gap-3 z-50"
          >
            <CheckCircleOutlined className="text-green-500 text-xl" />
            <span className="text-gray-800 font-medium">Login Successful!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent mb-20"
      >
        Welcome Ali Package
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-[95%] mb-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: index * 0.12,
              type: "spring",
              stiffness: 80,
              damping: 15,
            }}
          >
            <Link
              to={item.link}
              className="group flex flex-col h-44 rounded-2xl overflow-hidden shadow-lg bg-white relative transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200"
            >
              <div
                className={`flex-1 flex justify-center items-center bg-gradient-to-r ${item.color}`}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  whileTap={{ scale: 0.95 }}
                  className="drop-shadow-xl"
                >
                  {item.icon}
                </motion.div>
              </div>
              <div className="h-[25%] flex justify-center items-center bg-white text-gray-800 font-semibold text-lg tracking-wide">
                {item.name}
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-500 bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_2s_infinite]" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
