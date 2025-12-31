const router = require("express").Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const { dashboard, toggleAvailability } = require("../controllers/driverController");
const { listOpenBookings, driverAccept, driverProgress, myBookingsDriver } = require("../controllers/bookingController");

router.use(requireAuth, requireRole("driver"));
router.get("/dashboard", dashboard);
router.post("/availability/toggle", toggleAvailability);
router.get("/bookings/open", listOpenBookings);
router.post("/bookings/:id/accept", driverAccept);
router.post("/bookings/:id/progress", driverProgress);
router.get("/bookings/mine", myBookingsDriver);

module.exports = router;
