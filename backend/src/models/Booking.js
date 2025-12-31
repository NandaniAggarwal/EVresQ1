const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  type: { type: String, enum: ["ROADSIDE", "HOME_CHARGE"], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "Host" },
  charger: { type: mongoose.Schema.Types.ObjectId, ref: "Charger" },
  pickupLocation: {
    text: String,
    lat: Number,
    lng: Number
  },
  destination: {
    text: String,
    lat: Number,
    lng: Number
  },
  status: { type: String, enum: ["Pending", "Accepted", "OnTheWay", "Charging", "Completed", "Cancelled"], default: "Pending" },
  isAccepted: { type: Boolean, default: false },
  payment: {
    method: { type: String, enum: ["CASH", "UPI", "CARD", "NONE"], default: "NONE" },
    amount: { type: Number, default: 0 },
    paid: { type: Boolean, default: false }
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
