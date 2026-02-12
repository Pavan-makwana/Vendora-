function Dashboard() {
  return (
    <>
      <h2>Dashboard</h2>

      <div className="card-grid">
        <div className="card">Total Vendors<br /><strong>6</strong></div>
        <div className="card">Total Purchases<br /><strong>₹93,500</strong></div>
        <div className="card">Payments Done<br /><strong>₹30,000</strong></div>
        <div className="card">Pending Amount<br /><strong>₹15,000</strong></div>
      </div>
    </>
  );
}

export default Dashboard;
