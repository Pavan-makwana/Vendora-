const express = require("express");
const cors = require("cors");
const app = express();

const vendorRoutes = require("./routes/vendorRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const productRoutes = require("./routes/productRoutes"); 

app.use(cors());
app.use(express.json());

app.use("/api/vendors", vendorRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/payments", paymentRoutes);

app.use("/api/products", productRoutes); 

app.get("/", (req, res) => {
  res.send("Vendora Backend Running ");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});