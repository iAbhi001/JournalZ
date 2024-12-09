const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const journalRoutes = require("./routes/journalRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const authenticateToken = require("./middleware/authMiddleware"); // Import authentication middleware
const logger = require("./utils/logger");

dotenv.config();

// Connect to MongoDB only if not in test mode
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://journalz.onrender.com","https://journalifyz.netlify.app"], // Allow specific origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow specific HTTP methods
  credentials: true, // Allow credentials like cookies
}));
// Request logging middleware
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Public routes
app.use("/api/users", userRoutes);

// Apply middleware to protect below routes
// app.use(authenticateToken);

// Default health check route
app.get("/", (req, res) => {
  res.status(200).json({
      status: "success",
      message: "Server is running smoothly!",
      timestamp: new Date(),
  });
});

// Optionally, add another route for detailed health checks
app.get("/health", (req, res) => {
  res.status(200).json({
      status: "success",
      databaseConnected: mongoose.connection.readyState === 1, // Check MongoDB connection
      timestamp: new Date(),
  });
});

// Protected routes
app.use("/api/journals", journalRoutes);
app.use("/api/admin", adminRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start server only if not in test mode
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app; // Export app for testing
