function VendorList() {
  const vendors = [
    {
      id: 1,
      name: "Rahul Sharma",
      company: "ABC Traders",
      phone: "9876543210",
      total: 12000,
    },
    {
      id: 2,
      name: "Neha Patel",
      company: "Patel Suppliers",
      phone: "9898989898",
      total: 18500,
    },
    {
      id: 3,
      name: "Amit Verma",
      company: "Verma Enterprises",
      phone: "9123456780",
      total: 9500,
    },
    {
      id: 4,
      name: "Snehal Mehta",
      company: "Mehta & Co.",
      phone: "9012345678",
      total: 22000,
    },
    {
      id: 5,
      name: "Rohit Singh",
      company: "Singh Wholesale",
      phone: "9988776655",
      total: 14000,
    },
    {
      id: 6,
      name: "Kiran Joshi",
      company: "Joshi Distributors",
      phone: "9090909090",
      total: 17500,
    },
  ];

  return (
    <>
      <h2>Vendor List</h2>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Vendor Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Total Purchase (₹)</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((vendor, index) => (
            <tr key={vendor.id}>
              <td>{index + 1}</td>
              <td>{vendor.name}</td>
              <td>{vendor.company}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default VendorList;
