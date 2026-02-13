import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import AppRoutes from "./AppRoutes";

function App() {
  const [purchases, setPurchases] = useState([]);
  const [payments, setPayments] = useState([]);
  const [vendors, setVendors] = useState([]); 

  const addPurchase = (purchase) => {
    setPurchases((prev) => [...prev, purchase]);
  };

  const addPayment = (payment) => {
    setPayments((prev) => [...prev, payment]);
  };

  const addVendor = (vendor) => {
    setVendors((prev) => [...prev, vendor]);
  };

  const deleteVendor = (id) => {
    setVendors((prev) => prev.filter((v) => v.id !== id));
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
      />
    </BrowserRouter>
  );
}

export default App;
