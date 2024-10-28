const router = require("express").Router();
const bcrypt = require("bcrypt");
const server = require("../server");
require("dotenv").config();
const adminSession = require("../middleware/admin-session");
const User = require("../models/show.model");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "No users found" });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
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
    const user = await User.create(req.body);
    res.status(201).json(user);
    
  } catch (error) {
    res.status(500).json({ message: "Unable to create new user" });
  }
}

const updateOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true});
    if (!user) {
    return res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
};

const deleteOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateOneUser,
  deleteOneUser
}