import { useState } from "react";

function VendorList({ vendors = [], deleteVendor, updateVendor }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (vendor) => {
    setEditId(vendor.id);
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
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vendors.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No vendors added
              </td>
            </tr>
          ) : (
            vendors.map((v, index) => (
              <tr key={v.id}>
                <td>{index + 1}</td>

                <td>
                  {editId === v.id ? (
                    <input
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    v.name
                  )}
                </td>

                <td>
                  {editId === v.id ? (
                    <input
                      name="gst"
                      value={editData.gst}
                      onChange={handleChange}
                    />
                  ) : (
                    v.gst
                  )}
                </td>

                <td>
                  {editId === v.id ? (
                    <input
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    v.email
                  )}
                </td>

                <td>
                  {editId === v.id ? (
                    <input
                      name="phone"
                      value={editData.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    v.phone
                  )}
                </td>

                <td>
                  {editId === v.id ? (
                    <input
                      name="country"
                      value={editData.country}
                      onChange={handleChange}
                    />
                  ) : (
                    v.country
                  )}
                </td>

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

                <td>
                  {editId === v.id ? (
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
                        onClick={() => deleteVendor(v.id)}
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
