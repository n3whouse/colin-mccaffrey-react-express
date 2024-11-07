const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const server = require("../server");
require("dotenv").config();
// const adminSession = require("../middleware/admin-session");
const User = require("../models/user.model");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "No users found" });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, username, password, isAdmin } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      isAdmin,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Unable to create new user" });
  }
};

const updateOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(id, req.body, {
      where: {
        id: id,
      },
    });
    if (!updated) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const updatedUser = await User.findByPk(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({
      where: {
        id: id,
      },
    });
    if (!deleted) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {}
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateOneUser,
  deleteOneUser,
  loginUser,
};
