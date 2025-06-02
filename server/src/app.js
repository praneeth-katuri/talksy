const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Built-in middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
