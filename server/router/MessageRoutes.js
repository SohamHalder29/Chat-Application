const { addMessage } = require("../controllers/MessageController");

const { Router } = require("express");

const router = Router();

router.post("/add-message", addMessage)

module.exports = router;