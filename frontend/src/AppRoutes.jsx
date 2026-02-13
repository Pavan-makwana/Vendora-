import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import VendorList from "./pages/VendorList";
import VendorEntry from "./pages/VendorEntry";
import PurchaseEntry from "./pages/PurchaseEntry";
import PurchaseHistory from "./pages/PurchaseHistory";
import PaymentPage from "./pages/PaymentPage";
import PaymentHistory from "./pages/PaymentHistory";

function AppRoutes({
  purchases,
  addPurchase,
  payments,
  addPayment,
  vendors,
  addVendor,
  deleteVendor,
  updateVendor,
}) {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route
          path="/"
          element={
            <Dashboard
              purchases={purchases}
              payments={payments}
              vendors={vendors}
            />
          }
        />

        <Route
          path="/vendors"
          element={
            <VendorList
              vendors={vendors}
              deleteVendor={deleteVendor}
              updateVendor={updateVendor}
            />
          }
        />

        <Route
          path="/vendor-entry"
          element={<VendorEntry addVendor={addVendor} />}
        />

        <Route
          path="/purchase-entry"
          element={<PurchaseEntry addPurchase={addPurchase} />}
        />

        <Route
          path="/purchase-history"
          element={<PurchaseHistory purchases={purchases} />}
        />

        <Route
          path="/payments"
          element={<PaymentPage addPayment={addPayment} />}
        />

        <Route
          path="/payment-history"
          element={<PaymentHistory payments={payments} />}
        />

      </Route>
    </Routes>
  );
}

export default AppRoutes;
