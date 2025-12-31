const mongoose = require("mongoose");
const { passportLocalMongoose, PLM_OPTIONS } = require("./commonPlugins");

const userSchema = new mongoose.Schema({
  name: { type: String,sparse: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  phone: String,
  role: { type: String, default: "user" }, // fixed
  vehicle: {
    makeModel: String,
    vehicleNumber: String,
    batteryCapacity: Number
  }
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose, PLM_OPTIONS);

module.exports = mongoose.model("User", userSchema);
