import { useState, useEffect } from "react";
import API from "../api/api";

function ProductManagement() {
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [newProductName, setNewProductName] = useState("");
  const [assignForm, setAssignForm] = useState({
    vendor_id: "",
    product_id: "",
    vendor_price: ""
  });

  const fetchData = async () => {
    try {
      const vRes = await API.get("/vendors");
      const pRes = await API.get("/products");
      setVendors(vRes.data);
      setProducts(pRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 1. Create Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await API.post("/products", { product_name: newProductName });
      alert("Product Created!");
      setNewProductName("");
      fetchData();
    } catch (err) {
      alert("Error creating product",err);
    }
  };

  // 2. Assign Product to Vendor
  const handleAssign = async (e) => {
    e.preventDefault();
    if (!assignForm.vendor_id || !assignForm.product_id || !assignForm.vendor_price) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post(`/vendors/${assignForm.vendor_id}/products`, {
        product_id: assignForm.product_id,
        vendor_price: assignForm.vendor_price
      });
      alert("Product Assigned to Vendor!");
      setAssignForm({ ...assignForm, vendor_price: "" }); 
    } catch (err) {
      alert("Error assigning product (Maybe it's already assigned?),",err);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
      
      {/* LEFT: Create Master Product */}
      <div className="card" style={{ flex: 1, minWidth: '300px' }}>
        <h3>1. Create New Product</h3>
        <p style={{fontSize: '0.9rem', color: '#666'}}>Define a product that exists in the world (e.g. "iPhone 15")</p>
        <form onSubmit={handleCreateProduct} className="form">
          <input 
            placeholder="Product Name" 
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            required
          />
          <button type="submit">Create Product</button>
        </form>

        <h4>Existing Products:</h4>
        <ul style={{maxHeight: '200px', overflowY: 'auto', paddingLeft: '20px'}}>
          {products.map(p => <li key={p.product_id}>{p.product_name}</li>)}
        </ul>
      </div>

      {/* RIGHT: Assign to Vendor */}
      <div className="card" style={{ flex: 1, minWidth: '300px' }}>
        <h3>2. Assign to Vendor</h3>
        <p style={{fontSize: '0.9rem', color: '#666'}}>Link a product to a vendor and set their price.</p>
        <form onSubmit={handleAssign} className="form">
          
          <label>Select Vendor:</label>
          <select 
            value={assignForm.vendor_id}
            onChange={(e) => setAssignForm({...assignForm, vendor_id: e.target.value})}
            required
          >
            <option value=""> Choose Vendor </option>
            {vendors.map(v => (
              <option key={v.vendor_id} value={v.vendor_id}>{v.vendor_name}</option>
            ))}
          </select>

          <label>Select Product:</label>
          <select 
            value={assignForm.product_id}
            onChange={(e) => setAssignForm({...assignForm, product_id: e.target.value})}
            required
          >
            <option value="">-- Choose Product --</option>
            {products.map(p => (
              <option key={p.product_id} value={p.product_id}>{p.product_name}</option>
            ))}
          </select>

          <label>Vendor Price (₹):</label>
          <input 
            type="number" 
            placeholder="e.g. 50000"
            value={assignForm.vendor_price}
            onChange={(e) => setAssignForm({...assignForm, vendor_price: e.target.value})}
            required
          />

          <button type="submit" style={{background: '#22c55e'}}>Assign Product</button>
        </form>
      </div>

    </div>
  );
}

export default ProductManagement;