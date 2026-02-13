import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VendorEntry({ addVendor }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gst: "",
    email: "",
    phone: "",
    country: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    addVendor({
      id: Date.now(),
      ...form,
    });
 
    
    navigate("/vendors");

    setForm({
      name: "",
      gst: "",
      email: "",
      phone: "",
      country: "",
      status: "Active",
    });
  };

  return (
    <>
      <h2>Vendor Entry</h2>

      <div className="form vendor-form">
        <input
          name="name"
          placeholder="Vendor Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="gst"
          placeholder="GST Number"
          value={form.gst}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone No"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button onClick={handleSubmit}>Add Vendor</button>
      </div>
    </>
  );
}

export default VendorEntry;
