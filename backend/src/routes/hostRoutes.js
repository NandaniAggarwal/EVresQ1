const router = require("express").Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const { dashboard } = require("../controllers/hostController");
const { myHostChargers } = require("../controllers/chargerController");

router.use(requireAuth, requireRole("host"));
router.get("/dashboard", dashboard);
router.get("/chargers/mine", myHostChargers);

module.exports = router;
