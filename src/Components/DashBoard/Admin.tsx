import { Outlet } from "react-router-dom";
import Navbar from "../Header Footer/NavBar";
import Footer from "../Header Footer/Footer";

function AdminDashBoardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Always on Top */}
      <header>
        <Navbar />
      </header>

      {/* Page Content */}
      <main className="flex-grow bg-gray-50 p-6">
        <Outlet />
      </main>

      {/* Footer Always at Bottom */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AdminDashBoardLayout;
