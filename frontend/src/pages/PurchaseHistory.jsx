function PurchaseHistory({ purchases = [] }) {
  return (
    <>
      <h2>Purchase History</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Invoice</th>
            <th>Vendor</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {purchases.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No purchases found
              </td>
            </tr>
          ) : (
            purchases.map((p) => (
              <tr key={p.purchase_id}>
                <td>{new Date(p.purchase_date).toLocaleDateString()}</td>
                
                <td>{p.invoice_number}</td>
                
                <td>{p.vendor_name || "Unknown"}</td> 
                
                <td>₹{Number(p.total_amount).toFixed(2)}</td>
                
                <td>
                  <span className={`status-badge ${p.payment_status}`}>
                    {p.payment_status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default PurchaseHistory;