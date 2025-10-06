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
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "antd";
import ChangePasswordModal from "../../Models/ChangePassword";
import FbrTokenModal from "../../Models/FBR_Token";

function Navbar({
  userName = "John Doe",
  profilePic,
}: {
  userName?: string;
  profilePic?: string;
}) {
  const [openMenu1, setOpenMenu1] = useState(false); // desktop tax reports
  const [openMenu2, setOpenMenu2] = useState(false); // desktop reports
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenMenu1, setMobileOpenMenu1] = useState(false);
  const [mobileOpenMenu2, setMobileOpenMenu2] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);

  const menu1Ref = useRef<HTMLDivElement | null>(null);
  const menu2Ref = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();

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

  const currentPageRaw =
    location.pathname.split("/").filter(Boolean).pop() || "Dashboard";
  const currentPage = currentPageRaw
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
    setMobileOpenMenu1(false);
    setMobileOpenMenu2(false);
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-600 to-amber-900 text-white shadow-lg">
      <nav className="w-full h-[10vh] flex flex-wrap items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="dashboard" className="flex items-center gap-2">
            <img
              src="/public/images/navbarLogo.webp"
              alt="Logo"
              className="h-10 w-10"
            />
            <span className="text-xl font-bold">ALI Packages</span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8 text-lg font-medium">
          <li>
            <Link
              to="dashboard"
              className="flex items-center gap-2 ml-4 hover:underline"
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

        {/* Right Side */}
        <div className="flex items-center gap-4 ml-auto flex-shrink-0">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Dropdowns + Profile */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Tax Reports */}
            <div className="relative" ref={menu1Ref}>
              <button
                onClick={() => setOpenMenu1(!openMenu1)}
                className="flex items-center mr-4 w-[180px] gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-amber-600 to-amber-900 hover:bg-white/30 transition"
              >
                <BsFillFileEarmarkBarGraphFill /> Tax Reports{" "}
                <span className="ml-4">▾</span>
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

            {/* Reports */}
            <div className="relative" ref={menu2Ref}>
              <button
                onClick={() => setOpenMenu2(!openMenu2)}
                className="flex items-center gap-2 w-[180px] px-4 py-2 rounded-md bg-gradient-to-r from-amber-600 to-amber-900 hover:bg-white/30 transition"
              >
                <HiDocumentReport /> Reports <span className="ml-12">▾</span>
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

            {/* Profile Dropdown */}
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
                  <Link
                    to="/"
                    onClick={() => setOpenProfile(false)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-500 font-semibold"
                  >
                    <FaSignOutAlt /> Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-amber-700 text-white px-6 py-4 space-y-3">
          <Link
            to="dashboard"
            onClick={handleMobileNavClick}
            className="flex items-center gap-2 hover:underline"
          >
            <MdDashboard /> Dashboard
          </Link>
          <Link
            to="products"
            onClick={handleMobileNavClick}
            className="flex items-center gap-2 hover:underline"
          >
            <FaBoxOpen /> Products
          </Link>
          <Link
            to="parties"
            onClick={handleMobileNavClick}
            className="flex items-center gap-2 hover:underline"
          >
            <FaUsers /> Parties
          </Link>

          {/* Tax Reports */}
          <div className="space-y-1">
            <button
              className="flex items-center gap-2 w-full"
              onClick={() => setMobileOpenMenu1(!mobileOpenMenu1)}
            >
              <BsFillFileEarmarkBarGraphFill /> Tax Reports ▾
            </button>
            {mobileOpenMenu1 && (
              <div className="pl-4 space-y-1">
                <Link
                  to="purchase-tax-list"
                  onClick={handleMobileNavClick}
                  className="block py-1 hover:underline"
                >
                  <FaListAlt /> Purchase Tax List
                </Link>
                <Link
                  to="sales-tax-list"
                  onClick={handleMobileNavClick}
                  className="block py-1 hover:underline"
                >
                  <FaListOl /> Sale Tax List
                </Link>
                <Link
                  to="credit-note-list"
                  onClick={handleMobileNavClick}
                  className="block py-1 hover:underline"
                >
                  <FaRegCreditCard /> Credit Note List
                </Link>
              </div>
            )}
          </div>

          {/* Reports */}
          <div className="space-y-1">
            <button
              className="flex items-center gap-2 w-full"
              onClick={() => setMobileOpenMenu2(!mobileOpenMenu2)}
            >
              <HiDocumentReport /> Reports ▾
            </button>
            {mobileOpenMenu2 && (
              <div className="pl-4 space-y-1">
                <Link
                  to="single-party"
                  onClick={handleMobileNavClick}
                  className="block py-1 hover:underline"
                >
                  <FaUser /> Single Party
                </Link>
                <Link
                  to="all-party"
                  onClick={handleMobileNavClick}
                  className="block py-1 hover:underline"
                >
                  <FaUsers /> All Party
                </Link>
                <Link
                  to="product-report"
                  onClick={handleMobileNavClick}
                  className="block py-1 hover:underline"
                >
                  <FaBox /> Product Report
                </Link>
                <Link
                  to="stock-report"
                  onClick={handleMobileNavClick}
                  className="block py-1 hover:underline"
                >
                  <FaWarehouse /> Stock Report
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Profile Section */}
          <div className="border-t border-white/50 pt-4 space-y-2">
            <div className="flex items-center gap-3">
              <Avatar
                size={40}
                src={profilePic || undefined}
                icon={!profilePic && <FaUserCircle style={{ fontSize: 40 }} />}
              />
              <p className="font-medium">{userName}</p>
            </div>
            <Link
              to="profile"
              onClick={handleMobileNavClick}
              className="block py-1 hover:underline flex items-center gap-2"
            >
              <FaCog /> Settings
            </Link>
            <button
              onClick={() => setShowTokenModal(true)}
              className="w-full text-left py-1 hover:underline flex items-center gap-2 text-amber-200"
            >
              <FaKey /> FBR Token
            </button>
            <button
              onClick={() => setShowChangePassword(true)}
              className="w-full text-left py-1 hover:underline flex items-center gap-2 text-amber-200"
            >
              <FaLock /> Change Password
            </button>
            <Link
              to="/"
              onClick={handleMobileNavClick}
              className="block py-1 hover:underline flex items-center gap-2 text-red-300 font-semibold"
            >
              <FaSignOutAlt /> Logout
            </Link>
          </div>
        </div>
      )}

      <hr className="border-t border-white opacity-40" />
      <div className="h-[8vh] text-2xl px-6 py-2 text-left text-white font-medium">
        <span className="font-bold">{currentPage}</span>
      </div>

      {/* Modals */}
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
