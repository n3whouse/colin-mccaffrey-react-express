const express = require("express");
const router = express.Router();
const { getShows, getOneShow, createShow, updateOneShow, deleteOneShow } = require("../controllers/show.controller");

router.get("/", getShows);
router.get("/:id", getOneShow);
router.post("/", createShow);
router.put("/:id", updateOneShow);
router.delete("/:id", deleteOneShow);

module.exports = router;