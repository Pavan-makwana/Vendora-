const express = require("express");
const router = express.Router();
const db = require("../db");

// GET - Fetch All Products
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM Products");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Create New Product
router.post("/", async (req, res) => {
  try {
    const { product_name } = req.body;
    
    if (!product_name) {
      return res.status(400).json({ error: "Product Name required" });
    }

    const [result] = await db.execute(
      "INSERT INTO Products (product_name) VALUES (?)",
      [product_name]
    );

    res.json({ message: "Product created", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;