const mongoose = require("mongoose");
const { passportLocalMongoose, PLM_OPTIONS } = require("./commonPlugins");

const hostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  phone: String,
  role: { type: String, default: "host" }
}, { timestamps: true });

hostSchema.plugin(passportLocalMongoose, PLM_OPTIONS);

module.exports = mongoose.model("Host", hostSchema);
