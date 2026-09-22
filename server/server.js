require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const dns = require("dns");

// Change DNS to avoid resolution issues on cloud platforms
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const providerRoutes = require("./routes/providerRoutes");
const serviceRequestRoutes = require("./routes/serviceRequestRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const locationRoutes = require("./routes/locationRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const customerBookingRoutes = require("./routes/customerBookingRoutes");
const customerProfileRoutes = require("./routes/customerProfileRoutes");
const socketHandler = require("./src/socketHandler");

// Connect Database
connectDB();

const app = express();
const server = http.createServer(app);

// Origin validation function for both Express and Socket.io
const originValidator = (origin, callback) => {
  // Allow requests with no origin (like mobile apps, curl, or Render health checks)
  if (!origin) return callback(null, true);

  const isAllowed =
    origin.includes("localhost") ||
    origin.includes("vercel.app");

  if (isAllowed) {
    return callback(null, true);
  } else {
    return callback(new Error("Not allowed by CORS"));
  }
};

// 1. CORS Middleware MUST COME FIRST
app.use(
  cors({
    origin: originValidator,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 2. Body Parsing & Cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3. Socket.io Setup with Matching CORS
const io = new Server(server, {
  cors: {
    origin: originValidator,
    credentials: true,
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

app.set("io", io);

// Initialize Socket Events
socketHandler(io);

// 4. API Routes
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
app.use("/api/location", locationRoutes);
app.use("/api/customer/profile", customerProfileRoutes);
app.use("/api/customer", customerBookingRoutes);

app.post("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "POST Working",
    body: req.body,
  });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 ServiceConnect API Running",
  });
});

// 5. Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});