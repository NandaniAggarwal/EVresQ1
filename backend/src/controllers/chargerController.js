const Charger = require("../models/Charger");
const Booking = require("../models/Booking");

async function createCharger(req, res) {
  try {
    const { title, address, city, pincode, geo, connectorType, powerKW, pricePerKWh } = req.body;
    const charger = await Charger.create({
      host: req.user._id, title, address, city, pincode, geo, connectorType, powerKW, pricePerKWh
    });
    res.json({ ok: true, charger });
  } catch (e) {
    res.status(400).json({ ok: false, message: e.message });
  }
}

async function listChargers(req, res) {
  const { city, pincode } = req.query;
  const q = {};
  if (city) q.city = city;
  if (pincode) q.pincode = pincode;
  const list = await Charger.find(q).populate("host", "name email phone");
  res.json({ ok: true, chargers: list });
}

async function bookHomeCharge(req, res) {
  try {
    const { chargerId, pickupLocation } = req.body;
    const charger = await Charger.findById(chargerId).populate("host");
    if (!charger || !charger.available) return res.status(404).json({ ok: false, message: "Charger not available" });
    const booking = await Booking.create({
      type: "HOME_CHARGE",
      user: req.user._id,
      host: charger.host._id,
      charger: charger._id,
      pickupLocation,
      status: "Accepted",
      isAccepted: true
    });
    res.json({ ok: true, booking });
  } catch (e) {
    res.status(400).json({ ok: false, message: e.message });
  }
}

async function myHostChargers(req, res) {
  const list = await Charger.find({ host: req.user._id });
  res.json({ ok: true, chargers: list });
}

module.exports = {
  createCharger,
  listChargers,
  bookHomeCharge,
  myHostChargers
};
