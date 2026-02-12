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
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {purchases.length === 0 && (
            <tr>
              <td colSpan="5">No purchases yet</td>
            </tr>
          )}

          {purchases.map((p) => (
            <tr key={p.id}>
              <td>{p.date}</td>
              <td>{p.vendor}</td>
              <td>{p.product}</td>
              <td>₹{p.amount}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PurchaseHistory;
