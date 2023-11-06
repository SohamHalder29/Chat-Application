const { checkUser, onboardUser, getAllUser } = require("../controllers/AuthController");

const { Router } = require("express");

const router = Router();

router.post("/check-user", checkUser);
router.post("/onboard-user", onboardUser);
router.get("/get-contacts", getAllUser);

module.exports = router;