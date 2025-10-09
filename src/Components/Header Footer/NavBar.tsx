import { useState, useRef, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import {
  FaBoxOpen,
  FaUsers,
  FaRegCreditCard,
  FaListAlt,
  FaListOl,
  FaBox,
  FaWarehouse,
  FaCog,
  FaUserCircle,
  FaUser,
  FaSignOutAlt,
  FaLock,
  FaKey,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { BsFillFileEarmarkBarGraphFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import ChangePasswordModal from "../../Models/ChangePassword";
import FbrTokenModal from "../../Models/FBR_Token";
import { useGetMyProfileQuery } from "../../api/Profile";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [userName, setUserName] = useState("User");
  const [profilePic, setProfilePic] = useState("");

  const menu1Ref = useRef<HTMLDivElement | null>(null);
  const menu2Ref = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const { data: userData } = useGetMyProfileQuery();
  const location = useLocation();
  const navigate = useNavigate();

  const capitalize = (str?: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  useEffect(() => {
    if (userData?.data) {
      const { first_name, last_name, profile_image } = userData.data;
      const fullName = `${capitalize(first_name)} ${capitalize(
        last_name
      )}`.trim();
      setUserName(fullName || "User");
      const imageUrl = profile_image
        ? profile_image.startsWith("http")
          ? profile_image
          : `${import.meta.env.VITE_API_URL || ""}${profile_image}`
        : "";
      setProfilePic(imageUrl);
    }
  }, [userData]);

  // ✅ Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menu1Ref.current && !menu1Ref.current.contains(target))
        setOpenMenu1(false);
      if (menu2Ref.current && !menu2Ref.current.contains(target))
        setOpenMenu2(false);
      if (profileRef.current && !profileRef.current.contains(target))
        setOpenProfile(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pathSegments = location.pathname.split("/").filter(Boolean);
  let currentPage = "Dashboard";

  if (pathSegments.length > 0) {
    let lastSegment = pathSegments[pathSegments.length - 1];

    // If the last segment is a number, use the one before it
    if (/^\d+$/.test(lastSegment)) {
      lastSegment = pathSegments[pathSegments.length - 2] || "Dashboard";
    }

    currentPage = lastSegment
      .replace(/[-_]/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }

  console.log("currentPage", currentPage);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-600 to-amber-900 text-white shadow-lg relative z-50">
      {/* Top Navbar */}
      <nav className="w-full h-[10vh] flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="dashboard" className="flex items-center gap-2">
            <img
              src="/public/images/navbarLogo.webp"
              alt="Logo"
              className="h-10 w-10"
            />
            <span className="text-xl font-bold">ALI Packages</span>
          </Link>
        </div>

        <ul className="hidden lg:flex items-center gap-8 text-lg font-medium">
          <li>
            <Link
              to="dashboard"
              className="flex items-center ml-4 gap-2 hover:underline"
            >
              <MdDashboard /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="products"
              className="flex items-center gap-2 hover:underline"
            >
              <FaBoxOpen /> Products
            </Link>
          </li>
          <li>
            <Link
              to="parties"
              className="flex items-center gap-2 hover:underline"
            >
              <FaUsers /> Parties
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4 ml-auto">
          <button
            className="lg:hidden text-3xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className="hidden lg:flex items-center gap-3">
            <div className="relative" ref={menu1Ref}>
              <button
                onClick={() => setOpenMenu1(!openMenu1)}
                className="flex items-center mr-4 w-[180px] gap-2 px-4 py-2 rounded-md bg-amber-700 hover:bg-amber-800 transition"
              >
                <BsFillFileEarmarkBarGraphFill /> Tax Reports{" "}
                <span className="ml-auto">▾</span>
              </button>
              {openMenu1 && (
                <ul className="absolute right-0 mt-2 mr-4 bg-white text-black shadow-lg rounded-md min-w-[180px] z-50">
                  <li>
                    <Link
                      to="purchase-tax-list"
                      onClick={() => setOpenMenu1(false)}
                      className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaListAlt /> Purchase Tax List
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="sales-tax-list"
                      onClick={() => setOpenMenu1(false)}
                      className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaListOl /> Sale Tax List
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="credit-note-list"
                      onClick={() => setOpenMenu1(false)}
                      className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaRegCreditCard /> Credit Note List
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            <div className="relative" ref={menu2Ref}>
              <button
                onClick={() => setOpenMenu2(!openMenu2)}
                className="flex items-center gap-2 w-[180px] px-4 py-2 rounded-md bg-amber-700 hover:bg-amber-800 transition"
              >
                <HiDocumentReport /> Reports <span className="ml-auto">▾</span>
              </button>
              {openMenu2 && (
                <ul className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md min-w-[180px] z-50">
                  <li>
                    <Link
                      to="single-party"
                      onClick={() => setOpenMenu2(false)}
                      className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaUser /> Single Party
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="all-party"
                      onClick={() => setOpenMenu2(false)}
                      className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaUsers /> All Party
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="product-report"
                      onClick={() => setOpenMenu2(false)}
                      className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaBox /> Product Report
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="stock-report"
                      onClick={() => setOpenMenu2(false)}
                      className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaWarehouse /> Stock Report
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            <div className="relative flex-shrink-0" ref={profileRef}>
              <div
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center gap-2 mr-8 cursor-pointer"
              >
                <Avatar
                  size={45}
                  src={profilePic || undefined}
                  icon={
                    !profilePic && <FaUserCircle style={{ fontSize: "45px" }} />
                  }
                />
                <span className="font-medium">{userName}</span>
              </div>

              {openProfile && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg min-w-[176px] z-50 overflow-hidden">
                  <Link
                    to="profile"
                    onClick={() => setOpenProfile(false)}
                    className="px-3 py-2 border-b font-medium flex items-center gap-2 hover:bg-gray-100"
                  >
                    <FaUserCircle /> {userName}
                  </Link>
                  <Link
                    to="profile"
                    onClick={() => setOpenProfile(false)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 font-medium"
                  >
                    <FaCog /> Settings
                  </Link>
                  <button
                    onClick={() => setShowTokenModal(true)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-amber-700 font-medium"
                  >
                    <FaKey /> FBR Token
                  </button>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-amber-700 font-medium"
                  >
                    <FaLock /> Change Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-500 font-semibold"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-amber-700 text-white px-6 py-4 space-y-4"
          >
            <Link
              to="dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block flex items-center gap-2"
            >
              <MdDashboard /> Dashboard
            </Link>
            <Link
              to="products"
              onClick={() => setMobileMenuOpen(false)}
              className="block flex items-center gap-2"
            >
              <FaBoxOpen /> Products
            </Link>
            <Link
              to="parties"
              onClick={() => setMobileMenuOpen(false)}
              className="block flex items-center gap-2"
            >
              <FaUsers /> Parties
            </Link>
            <hr className="border-white/30" />
            <p className="font-semibold">Tax Reports</p>
            <Link
              to="purchase-tax-list"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4"
            >
              • Purchase Tax List
            </Link>
            <Link
              to="sales-tax-list"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4"
            >
              • Sales Tax List
            </Link>
            <Link
              to="credit-note-list"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4"
            >
              • Credit Note List
            </Link>
            <hr className="border-white/30" />
            <p className="font-semibold">Reports</p>
            <Link
              to="single-party"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4"
            >
              • Single Party
            </Link>
            <Link
              to="all-party"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4"
            >
              • All Party
            </Link>
            <Link
              to="product-report"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4"
            >
              • Product Report
            </Link>
            <Link
              to="stock-report"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4"
            >
              • Stock Report
            </Link>
            <hr className="border-white/30" />
            <button
              onClick={() => setShowChangePassword(true)}
              className="block flex items-center gap-2 w-full text-left"
            >
              <FaLock /> Change Password
            </button>
            <button
              onClick={() => setShowTokenModal(true)}
              className="block flex items-center gap-2 w-full text-left"
            >
              <FaKey /> FBR Token
            </button>
            <button
              onClick={handleLogout}
              className="block flex items-center gap-2 w-full text-left text-red-300"
            >
              <FaSignOutAlt /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <hr className="border-t border-white opacity-40" />
      <div className="h-[8vh] text-2xl ml-12 px-6 py-2 text-left text-white font-medium">
        <span className="font-bold">{currentPage}</span>
      </div>

      {showChangePassword && (
        <ChangePasswordModal
          visible={showChangePassword}
          onClose={() => setShowChangePassword(false)}
        />
      )}
      {showTokenModal && (
        <FbrTokenModal
          visible={showTokenModal}
          onClose={() => setShowTokenModal(false)}
        />
      )}
    </div>
  );
}

export default Navbar;
