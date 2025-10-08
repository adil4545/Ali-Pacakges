import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Components/Login Pages/Login";
import ForgetPassword from "./Components/Login Pages/ForgetPassword";
import New_Password_Set from "./Components/Login Pages/New_Password_Set";

import AdminDashBoardLayout from "./Components/DashBoard/Admin";
import Products from "./Pages/Product/Products";
import AddProduct from "./Pages/Product/AddProduct";
import Parties from "./Pages/Parties/Parties";
import AddParty from "./Pages/Parties/AddParty";
import EditParty from "./Pages/Parties/EditParty";
import Purchase_Tax_Invoice from "./Pages/Purchase Tax Invoice/Purchase_Tax_Invoice";
import Sales_Tax_Invoice from "./Pages/SalesTaxInvoice/Sales_Tax_Invoice";
import Credit_Note from "./Pages/Credit Note/Credit_Note";
import Profile from "./Components/Setting/Profile";
import Purchase_Tax_List from "./Pages/TaxLists/Purchase_Tax_List";
import Sales_Tax_List from "./Pages/TaxLists/Sales_Tax_List";
import Credit_Note_List from "./Pages/TaxLists/Credit_Note_List";
import Single_Party from "./Pages/Reports/Single_Party";
import All_Party from "./Pages/Reports/All_Party";
import Product_report from "./Pages/Reports/Product_report";
import Stock_Report from "./Pages/Reports/Stock_Report";

import AdminDashboard from "./Components/DashBoard/DashBoard";

import SuperAdmin from "./Components/Super Admin/Admin Layout/SuperAdmin";
import SuperAdminDashboard from "./Components/Super Admin/super admin Dashboard/SuperAdminDashboard";
import Admins from "./Components/Super Admin/Admins/Admins";
import AddAdmin from "./Components/Super Admin/Admins/AddAdmin";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/new-password-set" element={<New_Password_Set />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/admin" element={<AdminDashBoardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="parties" element={<Parties />} />
          <Route path="add-party" element={<AddParty />} />
          <Route path="edit-Party/:id" element={<EditParty />} />
          <Route
            path="purchase-tax-invoice"
            element={<Purchase_Tax_Invoice />}
          />
          <Route path="sales-tax-invoice" element={<Sales_Tax_Invoice />} />
          <Route path="credit-note" element={<Credit_Note />} />
          <Route path="profile" element={<Profile />} />
          <Route path="purchase-tax-list" element={<Purchase_Tax_List />} />
          <Route path="sales-tax-list" element={<Sales_Tax_List />} />
          <Route path="credit-note-list" element={<Credit_Note_List />} />
          <Route path="single-party" element={<Single_Party />} />
          <Route path="all-party" element={<All_Party />} />
          <Route path="product-report" element={<Product_report />} />
          <Route path="stock-report" element={<Stock_Report />} />
        </Route>

        <Route path="/SuperAdmin" element={<SuperAdmin />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="admins" element={<Admins />} />
          <Route path="add-admin" element={<AddAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
