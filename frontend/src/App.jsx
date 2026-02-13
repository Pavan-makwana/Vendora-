import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import AppRoutes from "./AppRoutes";
import API from "./api/api.js";

function App() {
  const [purchases, setPurchases] = useState([]);
  const [payments, setPayments] = useState([]);
  const [vendors, setVendors] = useState([]);

  // 1. Fetch Initial Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendorRes = await API.get("/vendors");
        const purchaseRes = await API.get("/purchases");
        const paymentRes = await API.get("/payments");

        setVendors(vendorRes.data);
        setPurchases(purchaseRes.data);
        setPayments(paymentRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // 2. Add Vendor (POST)
  const addVendor = async (vendor) => {
    try {
      const payload = {
        vendor_name: vendor.name,
        gst_number: vendor.gst,
        email: vendor.email,
        phone: vendor.phone,
        country: vendor.country,
        status: vendor.status,
      };

      await API.post("/vendors", payload);

      // Refresh list
      const res = await API.get("/vendors");
      setVendors(res.data);
    } catch (err) {
      console.error(err);
      alert("Error adding vendor");
    }
  };

  // 3. Add Purchase 
  const addPurchase = async (purchaseData) => {
    try {
    
      await API.post("/purchases", purchaseData);

      const res = await API.get("/purchases");
      setPurchases(res.data);
    } catch (err) {
      console.error("Error adding purchase:", err);
      alert("Failed to add purchase. Check backend logs.");
    }
  };

  // 4. Add Payment 
  const addPayment = async (payment) => {
    try {
      await API.post("/payments", {
        purchase_id: payment.purchase_id, 
        payment_date: payment.date,      
        amount_paid: payment.paid,        
        payment_mode: payment.mode,       
        
        reference_number: payment.reference || null 
      });

      const res = await API.get("/payments");
      setPayments(res.data);
      
      const purchRes = await API.get("/purchases");
      setPurchases(purchRes.data);
      
      alert("Payment Added Successfully!"); 

    } catch (err) {
      console.error("Error adding payment:", err);
      alert("Failed to add payment. Check console for details.");
    }
  };

  // 5. Delete Vendor 
  const deleteVendor = async (id) => {
    try {
      await API.delete(`/vendors/${id}`);
      setVendors((prev) => prev.filter((v) => v.vendor_id !== id));
    } catch (err) {
      console.error("Error deleting vendor:", err);
    }
  };

  // 6. Update Vendor
  const updateVendor = async (updatedVendor) => {
    try {
      const payload = {
        vendor_name: updatedVendor.vendor_name,
        gst_number: updatedVendor.gst_number,
        email: updatedVendor.email,
        phone: updatedVendor.phone,
        country: updatedVendor.country,
        status: updatedVendor.status,
      };

      // Calls PUT /vendors/:id
      await API.put(`/vendors/${updatedVendor.vendor_id}`, payload);

      // Update Local State
      setVendors((prev) =>
        prev.map((v) =>
          v.vendor_id === updatedVendor.vendor_id ? updatedVendor : v
        )
      );
    } catch (err) {
      console.error("Error updating vendor:", err);
      alert("Failed to update vendor");
    }
  };

  return (
    <BrowserRouter>
      <AppRoutes
        purchases={purchases}
        addPurchase={addPurchase}
        payments={payments}
        addPayment={addPayment}
        vendors={vendors}
        addVendor={addVendor}
        deleteVendor={deleteVendor}
        updateVendor={updateVendor}
      />
    </BrowserRouter>
  );
}

export default App;