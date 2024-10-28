const express = require("express");
const router = express.Router();

const {
  getUsers,
  getOneUser,
  createUser,
  updateOneUser,
  deleteOneUser,
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.get("/:id", getOneUser);
router.post("/", createUser);
router.put("/:id", updateOneUser);
router.delete("/:id", deleteOneUser);

module.exports = router;