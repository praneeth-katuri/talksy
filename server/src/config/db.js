const mongoose = require("mongoose");
const config = require("../config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.dbUri);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB Connection Error", err);
    process.exit(1);
  }
};

module.exports = connectDB;
