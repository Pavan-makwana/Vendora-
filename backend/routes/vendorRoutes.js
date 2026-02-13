const express = require("express");
const router = express.Router();
const db = require("../db");

// POST - Add Vendor
router.post("/", async (req, res) => {
  try {
    const { vendor_name, gst_number, email, phone, country, status } = req.body;

    const vendorStatus = status || 'Active';

    const query = `
      INSERT INTO Vendors 
      (vendor_name, gst_number, email, phone, country, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
      vendor_name,
      gst_number,
      email,
      phone,
      country,
      vendorStatus
    ]);

    res.json({ message: "Vendor added successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Fetch All Vendors
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM Vendors ORDER BY created_at DESC";
    const [rows] = await db.execute(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Remove Vendor
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM Vendors WHERE vendor_id = ?", [id]);
    res.json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Fetch products for Single Vendor
router.get("/:id/purchases", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT 
         purchase_id,
         invoice_number,
         purchase_date,
         total_amount,
         paid_amount,
         pending_amount,
         payment_status
       FROM Purchases
       WHERE vendor_id = ?
       ORDER BY purchase_date DESC`,
      [id]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//  PUT - Update Existing Vendor
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { vendor_name, gst_number, email, phone, country, status } = req.body;
    
    const query = `
    UPDATE Vendors 
    SET vendor_name = ?, gst_number = ?, email = ?, phone = ?, country = ?, status = ?
    WHERE vendor_id = ?
    `;
    
    await db.execute(query, [
      vendor_name,
      gst_number,
      email,
      phone,
      country,
      status,
      id
    ]);
    
    res.json({ message: "Vendor updated successfully" });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Fetch Products for a specific Vendor 
router.get("/:id/products", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT vp.vendor_product_id, p.product_name, vp.vendor_price 
      FROM VendorProducts vp
      JOIN Products p ON vp.product_id = p.product_id
      WHERE vp.vendor_id = ?
    `;
    const [rows] = await db.execute(query, [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id/products", async (req, res) => {
  try {
    const vendor_id = req.params.id;
    const { product_id, vendor_price } = req.body;

    if (!product_id || !vendor_price) {
      return res.status(400).json({ error: "Product ID and Price are required" });
    }

    await db.execute(
      `INSERT INTO VendorProducts (vendor_id, product_id, vendor_price) 
       VALUES (?, ?, ?)`,
      [vendor_id, product_id, vendor_price]
    );

    res.json({ message: "Product assigned to vendor successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET - Fetch purchases for Single Vendor
router.get("/:id/purchases", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT 
         purchase_id,
         invoice_number,
         purchase_date,
         total_amount,
         payment_status
       FROM Purchases
       WHERE vendor_id = ?
       ORDER BY purchase_date DESC`,
      [id]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;