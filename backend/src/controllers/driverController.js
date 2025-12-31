const Driver = require("../models/Driver");
function dashboard(req, res) {
  res.json({ ok: true, message: "Driver dashboard", driver: { id: req.user._id, name: req.user.name, email: req.user.email, isAvailable: req.user.isAvailable } });
}
async function toggleAvailability(req, res) {
  req.user.isAvailable = !req.user.isAvailable;
  await req.user.save();
  res.json({ ok: true, isAvailable: req.user.isAvailable });
}
module.exports = { dashboard, toggleAvailability };
