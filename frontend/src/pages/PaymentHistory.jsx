function PaymentHistory({ payments = [] }) {
  return (
    <>
      <h2>Payment History</h2>

      <div className="card-grid">
        {payments.length === 0 && <p>No payments recorded yet.</p>}

        {payments.map((p) => (
          <div className="card" key={p.payment_id}>
            <p>
              <b>Invoice:</b> {p.invoice_number || "N/A"}
            </p>
            <p>
              <b>Date:</b> {new Date(p.payment_date).toLocaleDateString()}
            </p>
            <p>
              <b>Amount Paid:</b> ₹{Number(p.amount_paid).toFixed(2)}
            </p>
            <p>
              <b>Mode:</b> {p.payment_mode}
            </p>
            <p style={{fontSize: '0.8rem', color: '#666'}}>
               Ref: {p.reference_number || '-'}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default PaymentHistory;