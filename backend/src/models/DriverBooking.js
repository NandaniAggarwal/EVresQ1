const mongoose = require("mongoose");

const driverBookingSchema = new mongoose.Schema({
  EVowner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EVowner",
    required: true,
  },

  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },

  status: {
    type: String,
    enum: [
      "requested",     // EV owner sent request
      "accepted",      // driver accepted
      "rejected",      // driver rejected
      "on_the_way",    // driver started
      "completed",
    ],
    default: "requested",
  },

  pickupLocation: {
    latitude: Number,
    longitude: Number,
    address: String,
  },

  note: String, 
}, { timestamps: true });

module.exports = mongoose.model("DriverBooking", driverBookingSchema);
