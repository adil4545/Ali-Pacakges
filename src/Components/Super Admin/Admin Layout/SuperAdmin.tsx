import { Outlet } from "react-router-dom";
import NavBar from "../Header/NavBar";
import Footer from "../../Header Footer/Footer";

function SuperAdmin() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Always on Top */}
      <header>
        <NavBar />
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

export default SuperAdmin;
