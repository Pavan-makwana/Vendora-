const express = require("express");
const cors = require("cors");

const app = express();

const vendorRoutes = require("./routes/vendorRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/vendors", vendorRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/purchases", require("./routes/purchaseRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/vendors", require("./routes/vendorRoutes"));


app.get("/", (req, res) => {
  res.send("Vendora Backend Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
