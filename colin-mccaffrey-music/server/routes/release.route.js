const express = require("express");
const router = express.Router();
const {
  getReleases,
  getOneRelease,
  createRelease,
  updateOneRelease,
  deleteOneRelease
} = require("../controllers/release.controller");

router.get("/", getReleases);
router.get("/:id", getOneRelease);
router.post("/", createRelease);
router.put("/:id", updateOneRelease);
router.delete("/:id", deleteOneRelease);

module.exports = router;