const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getReleases,
  getOneRelease,
  createRelease,
  updateOneRelease,
  deleteOneRelease,
} = require("../controllers/release.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/release-covers");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

router.get("/", getReleases);
router.get("/:id", getOneRelease);
router.post("/", upload.single("imageFile"), createRelease);
router.put("/:id", updateOneRelease);
router.delete("/:id", deleteOneRelease);

module.exports = router;
