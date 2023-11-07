const { addMessage, getMessage } = require("../controllers/MessageController");

const { Router } = require("express");

const router = Router();

router.post("/add-message", addMessage)
router.get("/get-messages/:from/:to", getMessage)
module.exports = router;