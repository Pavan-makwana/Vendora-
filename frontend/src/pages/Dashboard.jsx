import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

function Dashboard({ purchases = [], payments = [], vendors = [] }) {

  const totalPurchaseAmount = purchases.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  const totalPaymentAmount = payments.reduce(
    (sum, p) => sum + Number(p.paid || 0),
    0
  );

  const purchaseChartData = purchases.map((p, index) => ({
    name: `P${index + 1}`,
    amount: Number(p.amount),
  }));

  const pieData = [
    { name: "Paid", value: totalPaymentAmount },
    {
      name: "Pending",
      value: Math.max(totalPurchaseAmount - totalPaymentAmount, 0),
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <>
      <h2>Dashboard</h2>

      <div className="card-grid">
        <div className="card">
          Total Vendors
          <strong>{vendors.length}</strong>
        </div>

        <div className="card">
          Total Purchases
          <strong>₹{totalPurchaseAmount}</strong>
        </div>

        <div className="card">
          Payments Done
          <strong>₹{totalPaymentAmount}</strong>
        </div>
      </div>

      <div className="card-grid" style={{ marginTop: "30px" }}>

        <div className="card">
          <h4>Purchases Overview</h4>

          {purchases.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "40px" }}>
              No purchase data available
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={purchaseChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card">
          <h4>Payment Status</h4>

          {totalPurchaseAmount === 0 ? (
            <p style={{ textAlign: "center", marginTop: "40px" }}>
              No payment data available
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </>
  );
}

export default Dashboard;
