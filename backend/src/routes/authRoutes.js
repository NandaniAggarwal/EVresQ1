const router = require("express").Router();
const { registerUser, registerDriver, registerHost, loginUser, loginDriver, loginHost, me, logout } = require("../controllers/authController");

router.post("/register/user", registerUser);
router.post("/register/driver", registerDriver);
router.post("/register/host", registerHost);

router.post("/login/user", loginUser);
router.post("/login/driver", loginDriver);
router.post("/login/host", loginHost);

router.get("/me", me);
router.post("/logout", logout);

module.exports = router;
