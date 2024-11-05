const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  getMediaItems,
  getOneMediaItem,
  createMediaItem,
  updateOneMediaItem,
  deleteOneMediaItem
} = require("../controllers/media.controller");

router.get("/", getMediaItems);
router.get("/:id", getOneMediaItem);
router.post("/", createMediaItem);
router.put("/:id", updateOneMediaItem);
router.delete("/:id", deleteOneMediaItem);

module.exports = router;