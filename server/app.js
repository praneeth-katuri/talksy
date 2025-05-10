const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/users", require("./routes/users"));
app.use("/api/frineds", require("./routes/f"))
connectDB();

module.exports = app;
