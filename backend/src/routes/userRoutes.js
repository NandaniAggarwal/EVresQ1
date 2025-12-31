const router = require("express").Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const { dashboard } = require("../controllers/userController");
const { myBookingsUser } = require("../controllers/bookingController");

router.use(requireAuth, requireRole("user"));
router.get("/dashboard", dashboard);
router.get("/bookings", myBookingsUser);

module.exports = router;
