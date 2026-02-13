const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ POST - Add Vendor
router.post("/", async (req, res) => {
  try {
    const { vendor_name, gst_number, email, phone, country } = req.body;

    const query = `
      INSERT INTO Vendors 
      (vendor_name, gst_number, email, phone, country)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
      vendor_name,
      gst_number,
      email,
      phone,
      country
    ]);

    res.json({ message: "Vendor added successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ GET - Fetch All Vendors
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM Vendors";

    const [rows] = await db.execute(query);

    res.status(200).json(rows);

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


module.exports = router;
