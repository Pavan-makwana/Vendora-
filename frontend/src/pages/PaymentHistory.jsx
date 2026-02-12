function PaymentHistory({ payments = [] }) {
  return (
    <>
      <h2>Payment History</h2>

      <div className="card-grid">
        {payments.length === 0 && <p>No payments yet</p>}

        {payments.map((p) => (
          <div className="card" key={p.id}>
            <p><b>Invoice:</b> {p.invoice}</p>
            <p><b>Date:</b> {p.date}</p>
            <p><b>Total:</b> ₹{p.total}</p>
            <p><b>Paid:</b> ₹{p.paid}</p>
            <p><b>Mode:</b> {p.mode}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default PaymentHistory;
