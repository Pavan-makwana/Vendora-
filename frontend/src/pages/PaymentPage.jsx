import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentPage({ addPayment }) {
  const navigate = useNavigate();

  const invoiceCounter = useRef(1);

  useEffect(() => {
    const lastInvoice = localStorage.getItem("invoiceCounter");
    if (lastInvoice) {
      invoiceCounter.current = Number(lastInvoice);
    }
    setInvoice(generateInvoice());
  }, []);

  const generateInvoice = () => {
    return `INV-${String(invoiceCounter.current).padStart(3, "0")}`;
  };

  const [invoice, setInvoice] = useState("");
  const [total, setTotal] = useState("");
  const [paid, setPaid] = useState("");
  const [mode, setMode] = useState("Cash");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payment = {
      id: Date.now(),
      invoice,
      total,
      paid,
      mode,
      date: new Date().toLocaleDateString(),
    };

    addPayment(payment);

    invoiceCounter.current += 1;
    localStorage.setItem("invoiceCounter", invoiceCounter.current);

    setInvoice(generateInvoice());

    navigate("/payment-history");
  };

  return (
    <>
      <h2>Payment</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input value={invoice} readOnly />

        <input
          placeholder="Total Amount"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          required
        />

        <input
          placeholder="Paid Amount"
          value={paid}
          onChange={(e) => setPaid(e.target.value)}
          required
        />

        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option>Cash</option>
          <option>UPI</option>
          <option>Bank</option>
        </select>

        <button type="submit">Pay Now</button>
      </form>
    </>
  );
}

export default PaymentPage;
