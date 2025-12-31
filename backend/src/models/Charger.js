const mongoose = require("mongoose");

const chargerSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: "Host", required: true },
  title: String,
  address: String,
  city: String,
  pincode: String,
  geo: {
    lat: Number,
    lng: Number
  },
  connectorType: { type: String, enum: ["Type2", "CCS2", "CHAdeMO", "GB/T", "Other"], default: "Type2" },
  powerKW: Number,
  pricePerKWh: Number,
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Charger", chargerSchema);
