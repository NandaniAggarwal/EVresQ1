const router = require("express").Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const { createRoadsideBooking } = require("../controllers/bookingController");

// user creates roadside help booking
router.post("/", requireAuth, requireRole("user"), createRoadsideBooking);

module.exports = router;
