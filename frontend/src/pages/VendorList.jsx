import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

function VendorList({ vendors = [], deleteVendor, updateVendor }) {
  const navigate = useNavigate(); // 2. Initialize hook
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (vendor) => {
    setEditId(vendor.vendor_id); 
    setEditData(vendor);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateVendor(editData);
    setEditId(null);
  };

  const handleStatusChange = (vendor, newStatus) => {
    updateVendor({ ...vendor, status: newStatus });
  };

  return (
    <>
      <h2>Vendor List</h2>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>GST</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Status</th>
            <th>History</th> 
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vendors.length === 0 ? (
            <tr>
              {/* Updated colSpan to 9 to match new column count */}
              <td colSpan="9" style={{ textAlign: "center" }}>
                No vendors added
              </td>
            </tr>
          ) : (
            vendors.map((v, index) => (
              <tr key={v.vendor_id}>
                <td>{index + 1}</td>

                {/* Vendor Name */}
                <td>
                  {editId === v.vendor_id ? (
                    <input
                      name="vendor_name"
                      value={editData.vendor_name || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    v.vendor_name
                  )}
                </td>

                {/* GST Number */}
                <td>
                  {editId === v.vendor_id ? (
                    <input
                      name="gst_number"
                      value={editData.gst_number || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    v.gst_number
                  )}
                </td>

                {/* Email */}
                <td>
                  {editId === v.vendor_id ? (
                    <input
                      name="email"
                      value={editData.email || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    v.email
                  )}
                </td>

                {/* Phone */}
                <td>
                  {editId === v.vendor_id ? (
                    <input
                      name="phone"
                      value={editData.phone || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    v.phone
                  )}
                </td>

                {/* Country */}
                <td>
                  {editId === v.vendor_id ? (
                    <input
                      name="country"
                      value={editData.country || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    v.country
                  )}
                </td>

                {/* Status Dropdown */}
                <td>
                  <select
                    value={v.status}
                    onChange={(e) =>
                      handleStatusChange(v, e.target.value)
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>

                {/* ✅ NEW: View History Button */}
                <td>
                  <button 
                    onClick={() => navigate(`/vendors/${v.vendor_id}/history`)}
                    style={{
                      backgroundColor: "#3b82f6", 
                      color: "white", 
                      border: "none", 
                      padding: "5px 10px", 
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.9rem"
                    }}
                  >
                    View
                  </button>
                </td>

                {/* Action Buttons */}
                <td>
                  {editId === v.vendor_id ? (
                    <>
                      <button className="save-btn" onClick={handleSave}>
                        Save
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(v)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteVendor(v.vendor_id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default VendorList;