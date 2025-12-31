const mongoose = require("mongoose");
const { passportLocalMongoose, PLM_OPTIONS } = require("./commonPlugins");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  phone: String,
  role: { type: String, default: "driver" },
  licenseNumber: String,
  vehicleNumber: String,
  preferredLocation: String,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

driverSchema.plugin(passportLocalMongoose, PLM_OPTIONS);

module.exports = mongoose.model("Driver", driverSchema);
