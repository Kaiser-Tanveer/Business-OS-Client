import { Route, Routes } from "react-router-dom";

import DashboardLayout from "../components/layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Sales from "../pages/Sales";
import Customers from "../pages/Customers";
import Expenses from "../pages/Expenses";
// import Inventory from "../pages/Inventory";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Inventory from "../pages/Inventory";
// import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<DashboardLayout />}>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/inventory"
          element={<Inventory />}
        />

        <Route
          path="/sales"
          element={<Sales />}
        />

        <Route
          path="/customers"
          element={<Customers />}
        />

        <Route
          path="/expenses"
          element={<Expenses />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

      <Route
        path="*"
        // element={<NotFound />}
      />

    </Routes>
  );
};

export default AppRoutes;