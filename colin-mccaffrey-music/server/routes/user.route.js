const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.middleware");
const adminCheck = require("../middleware/admin.middleware");

const {
  getUsers,
  getOneUser,
  createUser,
  updateOneUser,
  deleteOneUser,
  loginUser,
} = require("../controllers/user.controller");

router.post("/", authenticateToken, createUser);
router.post("/login", loginUser);

router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getOneUser);
router.put("/:id", authenticateToken, adminCheck, updateOneUser);
router.delete("/:id", authenticateToken, adminCheck, deleteOneUser);

module.exports = router;
