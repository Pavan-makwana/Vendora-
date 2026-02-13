import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import VendorList from "./pages/VendorList";
import VendorEntry from "./pages/VendorEntry";
import PurchaseEntry from "./pages/PurchaseEntry";
import PurchaseHistory from "./pages/PurchaseHistory";
import PaymentPage from "./pages/PaymentPage";
import PaymentHistory from "./pages/PaymentHistory";
import ProductManagement from "./pages/ProductManagement";
import VendorPurchases from "./pages/VendorPurchases";

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
      {/* All these routes will share the Sidebar & Navbar */}
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
        <Route path="/vendors/:id/history" element={<VendorPurchases />} />

        <Route
          path="/purchase-entry"
          element={
            <PurchaseEntry 
              addPurchase={addPurchase} 
              vendors={vendors} 
            />
          }
        />

        <Route
          path="/purchase-history"
          element={<PurchaseHistory purchases={purchases} />}
        />

        <Route
          path="/payments"
          element={
            <PaymentPage 
              addPayment={addPayment} 
              purchases={purchases} 
            />
          }
        />

        <Route
          path="/payment-history"
          element={<PaymentHistory payments={payments} />}
        />

        <Route path="/products" element={<ProductManagement />} />

      </Route>
    </Routes>
  );
}

export default AppRoutes;