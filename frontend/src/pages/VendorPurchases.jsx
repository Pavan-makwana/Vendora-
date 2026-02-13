import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

function VendorPurchases() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get(`/vendors/${id}/purchases`);
        setPurchases(res.data);
      } catch (err) {
        console.error("Error fetching vendor history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [id]);

  return (
    <>
      <button onClick={() => navigate("/vendors")} style={{marginBottom: "20px", cursor: "pointer"}}>
        ← Back to Vendor List
      </button>

      <h2>Vendor Purchase History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Invoice #</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No purchases found for this vendor.
                </td>
              </tr>
            ) : (
              purchases.map((p) => (
                <tr key={p.purchase_id}>
                  <td>{new Date(p.purchase_date).toLocaleDateString()}</td>
                  <td>{p.invoice_number}</td>
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
      )}
    </>
  );
}

export default VendorPurchases;