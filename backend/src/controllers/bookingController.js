const Booking = require("../models/Booking");
const Driver = require("../models/Driver");

async function createRoadsideBooking(req, res) {
  try {
    const { pickupLocation, destination } = req.body;
    const booking = await Booking.create({
      type: "ROADSIDE",
      user: req.user._id,
      pickupLocation,
      destination
    });
    res.json({ ok: true, booking });
  } catch (e) {
    res.status(400).json({ ok: false, message: e.message });
  }
}

async function listOpenBookings(_req, res) {
  const list = await Booking.find({ type: "ROADSIDE", isAccepted: false, status: "Pending" }).sort({ createdAt: -1 });
  res.json({ ok: true, bookings: list });
}

async function driverAccept(req, res) {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ ok: false, message: "Booking not found" });
    if (booking.isAccepted) return res.status(400).json({ ok: false, message: "Already accepted" });
    booking.isAccepted = true;
    booking.status = "Accepted";
    booking.driver = req.user._id;
    await booking.save();
    res.json({ ok: true, booking });
  } catch (e) {
    res.status(400).json({ ok: false, message: e.message });
  }
}

async function driverProgress(req, res) {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ ok: false, message: "Booking not found" });
    if (!booking.driver || String(booking.driver) !== String(req.user._id)) {
      return res.status(403).json({ ok: false, message: "Not your booking" });
    }
    const { status } = req.body; // OnTheWay | Charging | Completed | Cancelled
    if (status) booking.status = status;
    await booking.save();
    res.json({ ok: true, booking });
  } catch (e) {
    res.status(400).json({ ok: false, message: e.message });
  }
}

async function myBookingsUser(req, res) {
  const list = await Booking.find({ user: req.user._id }).populate("driver host charger");
  res.json({ ok: true, bookings: list });
}

async function myBookingsDriver(req, res) {
  const list = await Booking.find({ driver: req.user._id }).populate("user");
  res.json({ ok: true, bookings: list });
}

module.exports = {
  createRoadsideBooking,
  listOpenBookings,
  driverAccept,
  driverProgress,
  myBookingsUser,
  myBookingsDriver
};
