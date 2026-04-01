require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { initCronJobs } = require("./cron/scheduler");

// Import routes
const authRoutes = require("./routes/auth.routes");
const clientRoutes = require("./routes/client.routes");
const moderatorRoutes = require("./routes/moderator.routes");
const adminRoutes = require("./routes/admin.routes");
const publicRoutes = require("./routes/public.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/moderator", moderatorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ads", publicRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AdFlow Pro API running on port ${PORT}`);
  initCronJobs();
});

module.exports = app;
