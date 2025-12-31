const mongoose = require("mongoose");

async function connectDB(DB_URL) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(DB_URL);
  mongoose.connection.on("connected", () => console.log("✅ MongoDB connected"));
  mongoose.connection.on("error", (err) => console.error("❌ MongoDB error:", err));
}

module.exports = { connectDB };
