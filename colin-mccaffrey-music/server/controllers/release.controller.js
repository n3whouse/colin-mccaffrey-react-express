const express = require("express");
const router = express.Router();
const Release = require("../models/release.model");

const getReleases = async (req, res) => {
  try {
    const releases = await Release.find({});
    res.status(200).json(releases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneRelease = async (req, res) => {
  try {
    const { id } = req.params;
    const release = await Release.findById(id);
    res.status(200).json(release);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRelease = async (req, res) => {
  try {
    const { title, description, purchaseLink } = req.body;
    const imageUrl = `http://localhost:8080/assets/${req.file.filename}`;

    const release = await Release.create({
      title,
      description,
      purchaseLink,
      imageUrl,
    });

    res.status(201).json(release);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOneRelease = async (req, res) => {
  try {
    const { id } = req.params;
    const release = await Release.findByIdAndUpdate(id, req.body);
    res.status(200).json(release);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOneRelease = async (req, res) => {
  try {
    const { id } = req.params;
    const release = await Release.findByIdAndDelete(id, req.body);
    res.status(200).json({ message: "Album successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReleases,
  getOneRelease,
  createRelease,
  updateOneRelease,
  deleteOneRelease,
};
