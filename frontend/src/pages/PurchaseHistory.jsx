function PurchaseHistory({ purchases = [] }) {
  return (
    <>
      <h2>Purchase History</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Vendor</th>
            <th>Product</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>

        <tbody>
          {purchases.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No purchases yet
              </td>
            </tr>
          ) : (
            purchases.map((p) => (
              <tr key={p.id}>
                <td>{p.date}</td>
                <td>{p.vendor}</td>
                <td>{p.product}</td>
                <td>₹{p.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default PurchaseHistory;
