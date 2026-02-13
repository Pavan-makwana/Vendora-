import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PurchaseEntry({ addPurchase }) {
  const navigate = useNavigate();

  const [vendor, setVendor] = useState("");
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPurchase = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      vendor,
      product,
      qty,
      amount: price, 
    };

    addPurchase(newPurchase);

    setVendor("");
    setProduct("");
    setQty("");
    setPrice("");

    navigate("/purchase-history");
  };

  return (
    <>
      <h2>Purchase Entry</h2>

      <form className="form purchase-entry-form" onSubmit={handleSubmit}>
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
