
require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const http = require("http");
const { Server } = require("socket.io");
const socketHandler= require("./src/socketHandler");
const reviewRoutes = require("./routes/reviewRoutes");

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
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");
dotenv.config();

connectDB();

const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.set("io", io);

// Socket Connection
socketHandler(io);  

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/service-request", serviceRequestRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 ServiceConnect API Running",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});