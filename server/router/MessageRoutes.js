const multer = require("multer");
const { addMessage, getMessage, addImageMessage } = require("../controllers/MessageController");
const { Router } = require("express");

const router = Router();

const uploadImage = multer({ dest: "uploads/images" });


router.post("/add-message", addMessage);
router.get("/get-messages/:from/:to", getMessage);
router.post("/add-image-massage", uploadImage.single("image"), addImageMessage);
module.exports = router;
