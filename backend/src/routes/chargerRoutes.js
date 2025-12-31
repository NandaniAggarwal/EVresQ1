const router = require("express").Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const { createCharger, listChargers, bookHomeCharge } = require("../controllers/chargerController");

// public list/search
router.get("/", listChargers);

// host create charger
router.post("/", requireAuth, requireRole("host"), createCharger);

// user books home charging
router.post("/book", requireAuth, requireRole("user"), bookHomeCharge);

module.exports = router;
