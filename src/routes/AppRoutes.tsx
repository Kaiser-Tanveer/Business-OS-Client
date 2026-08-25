import { Route, Routes } from "react-router-dom";

import DashboardLayout from "../assets/components/dashboard/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Sales from "../pages/Sales";
import Products from "../pages/Products";
import Customers from "../pages/Customers";
import Expenses from "../pages/Expenses";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="sales" element={<Sales />} />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;