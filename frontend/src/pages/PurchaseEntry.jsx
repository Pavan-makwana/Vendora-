import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api"; 

function PurchaseEntry({ addPurchase, vendors = [] }) {
  const navigate = useNavigate();

  const [vendorId, setVendorId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [availableProducts, setAvailableProducts] = useState(() => (vendorId ? [] : []));

  const [items, setItems] = useState([
    { vendor_product_id: "", quantity: 1, purchase_price: 0 }
  ]);

  
  useEffect(() => {
    if (vendorId) {
      const fetchProducts = async () => {
        try {
          // Calls the new route we added to backend
          const res = await API.get(`/vendors/${vendorId}/products`);
          setAvailableProducts(res.data);
        } catch (err) {
          console.error("Failed to load vendor products", err);
          setAvailableProducts([]);
        }
      };
      fetchProducts().then(() => {
        // Reset items when vendor changes to prevent mismatch
        setItems([{ vendor_product_id: "", quantity: 1, purchase_price: 0 }]);
      });
    }
  }, [vendorId]);

  // --- Handlers ---

  // Update a specific field in a specific row
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    // Optional: If product selected, auto-fill price from DB (if you want)
    if (field === "vendor_product_id") {
      const selectedProd = availableProducts.find(p => p.vendor_product_id == value);
      if (selectedProd) {
        newItems[index].purchase_price = selectedProd.vendor_price;
      }
    }

    setItems(newItems);
  };

  // Add a new empty row
  const addItem = () => {
    setItems([...items, { vendor_product_id: "", quantity: 1, purchase_price: 0 }]);
  };

  // Remove a row
  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Calculate Total Invoice Amount for display
  const grandTotal = items.reduce((sum, item) => {
    return sum + (Number(item.quantity) * Number(item.purchase_price));
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vendorId || !invoiceNumber) {
      alert("Please select a vendor and enter invoice number.");
      return;
    }

    // Filter out invalid rows (empty product IDs)
    const validItems = items.filter(i => i.vendor_product_id);

    if (validItems.length === 0) {
      alert("Please add at least one valid product.");
      return;
    }

    const payload = {
      vendor_id: vendorId,
      invoice_number: invoiceNumber,
      purchase_date: purchaseDate,
      items: validItems.map(item => ({
        vendor_product_id: item.vendor_product_id,
        quantity: Number(item.quantity),
        purchase_price: Number(item.purchase_price)
      }))
    };

    addPurchase(payload);
    navigate("/purchase-history");
  };

  return (
    <>
      <h2>New Purchase Entry</h2>

      <form className="form purchase-entry-form" onSubmit={handleSubmit} style={{maxWidth: '800px'}}>
        
        {/* --- Header Section --- */}
        <div className="form-row" style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
          <div style={{flex: 1}}>
            <label>Select Vendor:</label>
            <select 
              value={vendorId} 
              onChange={(e) => setVendorId(e.target.value)}
              required
              style={{width: '100%', padding: '8px'}}
            >
              <option value="">-- Choose Vendor --</option>
              {vendors.map((v) => (
                <option key={v.vendor_id} value={v.vendor_id}>
                  {v.vendor_name}
                </option>
              ))}
            </select>
          </div>

          <div style={{flex: 1}}>
            <label>Invoice Number:</label>
            <input
              placeholder="e.g. INV-2024-001"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              required
              style={{width: '100%'}}
            />
          </div>

          <div style={{flex: 1}}>
            <label>Date:</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              required
              style={{width: '100%'}}
            />
          </div>
        </div>

        <hr />
        
        {/* --- Items Section --- */}
        <h4>Product Items</h4>
        
        {availableProducts.length === 0 && vendorId && (
          <p style={{color: 'red'}}>No products found for this vendor. Please add products to VendorProducts table first.</p>
        )}

        <table className="table" style={{marginTop: '10px'}}>
          <thead>
            <tr>
              <th>Product</th>
              <th style={{width: '100px'}}>Qty</th>
              <th style={{width: '120px'}}>Price</th>
              <th style={{width: '120px'}}>Total</th>
              <th style={{width: '50px'}}>X</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={item.vendor_product_id}
                    onChange={(e) => handleItemChange(index, 'vendor_product_id', e.target.value)}
                    required
                    style={{width: '100%'}}
                    disabled={!vendorId}
                  >
                    <option value="">-- Select Product --</option>
                    {availableProducts.map((p) => (
                      <option key={p.vendor_product_id} value={p.vendor_product_id}>
                        {p.product_name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    required
                    style={{width: '100%'}}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={item.purchase_price}
                    onChange={(e) => handleItemChange(index, 'purchase_price', e.target.value)}
                    required
                    style={{width: '100%'}}
                  />
                </td>
                <td>
                  ₹{(item.quantity * item.purchase_price).toFixed(2)}
                </td>
                <td>
                  {items.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeItem(index)}
                      style={{background: '#ff4d4d', color: 'white', border: 'none', cursor: 'pointer', padding: '5px 10px'}}
                    >
                      X
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <button 
            type="button" 
            onClick={addItem} 
            className="edit-btn" 
            style={{background: '#2563eb', color: 'white'}}
            disabled={!vendorId}
          >
            + Add Another Product
          </button>
          
          <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
        </div>

        <button type="submit" style={{marginTop: '20px', width: '100%', fontSize: '1.2rem'}}>
          Save Purchase Invoice
        </button>

      </form>
    </>
  );
}

export default PurchaseEntry;