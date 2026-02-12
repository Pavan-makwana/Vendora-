import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PurchaseEntry({ addPurchase }) {
  const [vendor, setVendor] = useState("");
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPurchase = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      vendor,
      product,
      amount: qty * price,
      status: "Pending",
    };

    addPurchase(newPurchase);          // ✅ add to history
    navigate("/purchase-history");     // ✅ redirect
  };

  return (
    <>
      <h2>Purchase Entry</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Vendor Name"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          required
        />
        <input
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button type="submit">Add Purchase</button>
      </form>
    </>
  );
}

export default PurchaseEntry;
