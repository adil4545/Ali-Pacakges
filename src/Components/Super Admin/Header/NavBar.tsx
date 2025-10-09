import { useState, useRef, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { useGetMyProfileQuery } from "../../../api/Profile";

function NavBar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [userName, setUserName] = useState("User");
  const [profilePic, setProfilePic] = useState("");
  const profileRef = useRef<HTMLDivElement | null>(null);

  const { data: userData } = useGetMyProfileQuery(); // ✅ fetch user data
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Capitalize helper
  const capitalize = (str?: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  // ✅ Update user info from API
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

  // ✅ Current page title
  const currentPageRaw =
    location.pathname.split("/").filter(Boolean).pop() || "Dashboard";

  const currentPage = currentPageRaw
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-600 to-amber-900 text-white shadow-lg">
      {/* Navbar */}
      <nav className="w-full h-[10vh] flex items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center gap-10">
          <Link to="dashboard" className="flex items-center gap-2">
            <img
              src="/images/navbarLogo.webp"
              alt="Logo"
              className="h-10 w-10"
            />
            <span className="text-xl font-bold">ALI Packages</span>
          </Link>

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

        {/* Right Section (Profile) */}
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
            <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg min-w-[130px] z-50 overflow-hidden">
              <button
                onClick={() => setOpenProfile(false)}
                className="w-full text-left px-3 py-2 border-b font-medium flex items-center gap-2 hover:bg-gray-100"
              >
                <FaUserCircle /> {userName}
              </button>

              <Link
                to="/"
                onClick={() => {
                  setOpenProfile(false);
                  handleLogout();
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
