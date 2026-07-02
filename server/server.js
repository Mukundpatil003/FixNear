require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");




const dns = require("dns");
// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const providerRoutes = require("./routes/providerRoutes");
const serviceRequestRoutes = require("./routes/serviceRequestRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const bookingRoutes = require("./routes/bookingRoutes");



dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/provider", providerRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/service-request", serviceRequestRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/booking", bookingRoutes);


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ServiceConnect API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});