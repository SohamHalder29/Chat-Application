const { checkUser } = require("../controllers/AuthController");

const { Router } = require("express");

const router = Router();

router.post("/check-user", checkUser);

module.exports = router;