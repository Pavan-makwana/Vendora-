const express = require("express");
const router = express.Router();
const db = require("../db");

/*
========================================================
POST /payments
Add New Payment
========================================================
*/
router.post("/", async (req, res) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const {
      purchase_id,
      payment_date,
      amount_paid,
      payment_mode,
      reference_number,
    } = req.body;

    // 🔹 Basic validation
    if (!purchase_id || !payment_date || !amount_paid || !payment_mode) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔹 Insert payment
    await connection.execute(
      `INSERT INTO Payments
       (purchase_id, payment_date, amount_paid, payment_mode, reference_number)
       VALUES (?, ?, ?, ?, ?)`,
      [purchase_id, payment_date, amount_paid, payment_mode, reference_number]
    );

    // 🔹 Recalculate totals
    await updatePurchasePaymentStatus(connection, purchase_id);

    await connection.commit();
    res.json({ message: "Payment recorded successfully" });

  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

/*
========================================================
PUT /payments/:id
Update Existing Payment
========================================================
*/
router.put("/:id", async (req, res) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const { id } = req.params;
    const {
      payment_date,
      amount_paid,
      payment_mode,
      reference_number,
    } = req.body;

    // 🔹 Check if payment exists
    const [paymentRows] = await connection.execute(
      `SELECT purchase_id FROM Payments WHERE payment_id = ?`,
      [id]
    );

    if (paymentRows.length === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const purchase_id = paymentRows[0].purchase_id;

    // 🔹 Update payment
    await connection.execute(
      `UPDATE Payments
       SET payment_date = ?,
           amount_paid = ?,
           payment_mode = ?,
           reference_number = ?
       WHERE payment_id = ?`,
      [payment_date, amount_paid, payment_mode, reference_number, id]
    );

    // 🔹 Recalculate totals
    await updatePurchasePaymentStatus(connection, purchase_id);

    await connection.commit();
    res.json({ message: "Payment updated successfully" });

  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

/*
========================================================
Reusable Function
Recalculate Paid, Pending, Status
========================================================
*/
async function updatePurchasePaymentStatus(connection, purchase_id) {

  // 🔹 Calculate total paid
  const [paidRows] = await connection.execute(
    `SELECT SUM(amount_paid) AS total_paid
     FROM Payments
     WHERE purchase_id = ?`,
    [purchase_id]
  );

  const total_paid = paidRows[0].total_paid || 0;

  // 🔹 Get purchase total
  const [purchaseRows] = await connection.execute(
    `SELECT total_amount
     FROM Purchases
     WHERE purchase_id = ?`,
    [purchase_id]
  );

  if (purchaseRows.length === 0) {
    throw new Error("Purchase not found");
  }

  const total_amount = purchaseRows[0].total_amount;
  const pending = total_amount - total_paid;

  let status = "Partial";
  if (pending <= 0) status = "Paid";
  if (total_paid === 0) status = "Unpaid";

  // 🔹 Update purchase table
  await connection.execute(
    `UPDATE Purchases
     SET paid_amount = ?,
         pending_amount = ?,
         payment_status = ?
     WHERE purchase_id = ?`,
    [total_paid, pending, status, purchase_id]
  );
}

module.exports = router;
