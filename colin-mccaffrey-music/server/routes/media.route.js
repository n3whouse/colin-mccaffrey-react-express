const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getMediaItems,
  getOneMediaItem,
  createMediaItem,
  updateOneMediaItem,
  deleteOneMediaItem,
} = require("../controllers/media.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/", getMediaItems);
router.get("/:id", getOneMediaItem);
router.post(
  "/",
  upload.fields([
    {
      name: "videoFile",
    },
    {
      name: "imageFile",
    },
  ]),
  (req, res, next) => {
    if (req.fileValidationError) {
      return res.status(400).send(req.fileValidationError);
    }
    createMediaItem(req, res);
  }
);
router.put("/:id", updateOneMediaItem);
router.delete("/:id", deleteOneMediaItem);

module.exports = router;
