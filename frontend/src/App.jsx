import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import AppRoutes from "./AppRoutes";

function App() {
  const [purchases, setPurchases] = useState([]);
  const [payments, setPayments] = useState([]);

  const addPurchase = (purchase) => {
    setPurchases((prev) => [...prev, purchase]);
  };

  const addPayment = (payment) => {
    setPayments((prev) => [...prev, payment]);
  };

  return (
    <BrowserRouter>
      <AppRoutes
        purchases={purchases}
        addPurchase={addPurchase}
        payments={payments}
        addPayment={addPayment}
      />
    </BrowserRouter>
  );
}

export default App;
