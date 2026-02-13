import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentPage({ addPayment, purchases = [] }) {
  const navigate = useNavigate();

  const [selectedPurchaseId, setSelectedPurchaseId] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [mode, setMode] = useState("Cash");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const pendingInvoices = purchases.filter(
    (p) => p.payment_status !== "Paid"
  );

  const handleInvoiceSelect = (e) => {
    const pId = e.target.value;
    setSelectedPurchaseId(pId);

    const selected = purchases.find((p) => p.purchase_id == pId);
    if (selected) {
      setPaidAmount(selected.pending_amount);
    } else {
      setPaidAmount("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!selectedPurchaseId) {
      alert("Please select an invoice");
      return;
    }

    addPayment({
      purchase_id: selectedPurchaseId,
      paid: paidAmount,
      mode: mode,
      date: date,
    });

    navigate("/payment-history");
  };

  return (
    <>
      <h2>Record Payment</h2>

      <form className="form" onSubmit={handleSubmit}>
        
        {/* Invoice Dropdown */}
        <label>Select Invoice (Pending Only):</label>
        <select 
          value={selectedPurchaseId} 
          onChange={handleInvoiceSelect}
          required
        >
          <option value="">-- Select Invoice --</option>
          {pendingInvoices.map((p) => (
            <option key={p.purchase_id} value={p.purchase_id}>
              {p.invoice_number} - (Pending: ₹{p.pending_amount})
            </option>
          ))}
        </select>

        <label>Payment Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Amount to Pay:</label>
        <input
          type="number"
          placeholder="Enter Amount"
          value={paidAmount}
          onChange={(e) => setPaidAmount(e.target.value)}
          required
        />

        <label>Payment Mode:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option>Cash</option>
          <option>UPI</option>
          <option>Bank Transfer</option>
          <option>Cheque</option>
        </select>

        <button type="submit">Pay Now</button>
      </form>
    </>
  );
}

export default PaymentPage;