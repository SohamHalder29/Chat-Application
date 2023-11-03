const { checkUser, onboardUser } = require("../controllers/AuthController");

const { Router } = require("express");

const router = Router();

router.post("/check-user", checkUser);
router.post("/onboard-user", onboardUser);
module.exports = router;