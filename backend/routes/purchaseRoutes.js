const express = require("express");
const router = express.Router();
const db = require("../db");


router.post("/", async (req, res) => {
  let connection;

  try {
    const { vendor_id, invoice_number, purchase_date, items } = req.body || {};

    //  Validate required fields
    if (!vendor_id || !invoice_number || !purchase_date || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Missing or invalid required fields" });
    }

    connection = await db.getConnection();
    await connection.beginTransaction();

    //  Insert purchase
    const [purchaseResult] = await connection.execute(
      `INSERT INTO Purchases 
       (vendor_id, invoice_number, purchase_date)
       VALUES (?, ?, ?)`,
      [vendor_id, invoice_number, purchase_date]
    );

    const purchase_id = purchaseResult.insertId;
    let totalAmount = 0;

    for (const item of items) {

      // ✅ Validate item fields
      if (
        !item.vendor_product_id ||
        item.quantity == null ||
        item.purchase_price == null
      ) {
        throw new Error("Invalid item data");
      }

      const quantity = Number(item.quantity);
      const purchase_price = Number(item.purchase_price);
      const total_price = quantity * purchase_price;

      totalAmount += total_price;

      // ✅ Insert purchase item
      await connection.execute(
        `INSERT INTO PurchaseItems 
         (purchase_id, vendor_product_id, quantity, purchase_price, total_price)
         VALUES (?, ?, ?, ?, ?)`,
        [
          purchase_id,
          item.vendor_product_id,
          quantity,
          purchase_price,
          total_price
        ]
      );

      // ✅ Get product_id safely
      const [rows] = await connection.execute(
        `SELECT product_id 
         FROM VendorProducts 
         WHERE vendor_product_id = ?`,
        [item.vendor_product_id]
      );

      if (rows.length === 0) {
        throw new Error("Invalid vendor_product_id");
      }

      const product_id = rows[0].product_id;

      // ✅ Update stock
      await connection.execute(
        `INSERT INTO Stock (product_id, quantity_available)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE 
         quantity_available = quantity_available + ?`,
        [product_id, quantity, quantity]
      );
    }

    // ✅ Update purchase summary
    await connection.execute(
      `UPDATE Purchases 
       SET total_amount = ?, 
           pending_amount = ?, 
           payment_status = 'Unpaid'
       WHERE purchase_id = ?`,
      [totalAmount, totalAmount, purchase_id]
    );

    await connection.commit();

    res.json({ message: "Purchase created successfully" });

  } catch (error) {

    if (connection) await connection.rollback();

    res.status(500).json({ error: error.message });

  } finally {

    if (connection) connection.release();
  }
});

module.exports = router;
