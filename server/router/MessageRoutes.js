const multer = require("multer");
const { addMessage, getMessage, addImageMessage, addAudioMessage } = require("../controllers/MessageController");
const { Router } = require("express");

const router = Router();

const uploadImage = multer({ dest: "uploads/images" });
const uploadAudio = multer({ dest: "uploads/recordings" });

router.post("/add-message", addMessage);
router.get("/get-messages/:from/:to", getMessage);
router.post("/add-image-massage", uploadImage.single("image"), addImageMessage);
router.post("/add-audio-massage", uploadAudio.single("audio"), addAudioMessage);

module.exports = router;
