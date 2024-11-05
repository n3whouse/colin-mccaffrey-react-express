const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getShows, getOneShow, createShow, updateOneShow, deleteOneShow } = require("../controllers/show.controller");

//multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../src/assets/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get("/", getShows);
router.get("/:id", getOneShow);
router.post("/", upload.single("imageFile"), createShow);
router.put("/:id", updateOneShow);
router.delete("/:id", deleteOneShow);

module.exports = router;