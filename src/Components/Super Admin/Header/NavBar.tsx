import { useState, useRef, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "antd";

interface NavbarProps {
  userName?: string;
  profilePic?: string;
}

function NavBar({ userName = "John Doe", profilePic }: NavbarProps) {
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Current page title (from URL)
  const currentPageRaw =
    location.pathname.split("/").filter(Boolean).pop() || "Dashboard";

  const currentPage = currentPageRaw
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const handelLocalStorageClear = () => {
    localStorage.clear();
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-600 to-amber-900 text-white shadow-lg">
      {/* Navbar */}
      <nav className="w-full h-[10vh] flex items-center justify-between px-6">
        {/* Left Section: Logo + Links */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link to="dashboard" className="flex items-center gap-2">
            <img
              src="/images/navbarLogo.webp"
              alt="Logo"
              className="h-10 w-10"
            />
            <span className="text-xl font-bold">ALI Packages</span>
          </Link>

          {/* Links */}
          <ul className="flex items-center gap-8 text-lg font-medium">
            <li>
              <Link
                to="dashboard"
                className="flex items-center gap-2 hover:underline"
              >
                <MdDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="admins"
                className="flex items-center gap-2 hover:underline"
              >
                <FaUsers /> Admins
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section: Avatar Dropdown */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-2 cursor-pointer mr-2"
          >
            <Avatar
              size={40}
              src={profilePic || undefined}
              icon={
                !profilePic && <FaUserCircle style={{ fontSize: "40px" }} />
              }
            />
            <span className="font-medium">{userName}</span>
          </div>

          {openProfile && (
            <div className="absolute right-0 mt-2  bg-white text-black rounded-md shadow-lg min-w-[130px] z-50 overflow-hidden">
              <button
                onClick={() => {
                  // Profile open ka code ya modal trigger karna hai to yahan likh do
                  setOpenProfile(false);
                }}
                className="w-full text-left px-3 py-2  border-b font-medium flex items-center gap-2 hover:bg-gray-100"
              >
                <FaUserCircle /> {userName}
              </button>

              <Link
                to="/"
                onClick={() => {
                  setOpenProfile(false);
                  handelLocalStorageClear();
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-500 font-semibold"
              >
                <FaSignOutAlt /> Logout
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Page Title */}
      <hr className="border-t border-white opacity-40" />
      <div className="h-[8vh] text-2xl px-6 py-2 text-left text-white font-medium">
        <span className="font-bold">{currentPage}</span>
      </div>
    </div>
  );
}

export default NavBar;
