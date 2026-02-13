function VendorList({ vendors = [], deleteVendor }) {
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
                <td>{v.name}</td>
                <td>{v.gst}</td>
                <td>{v.email}</td>
                <td>{v.phone}</td>
                <td>{v.country}</td>

                <td>
                  <span
                    className={
                      v.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {v.status}
                  </span>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteVendor(v.id)}
                  >
                    Delete
                  </button>
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
