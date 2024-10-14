const express = require("express");
const router = express.Router();
const Media = require("../models/media.model");

const getMediaItems = async (req, res) => {
  try {
    const media = await Media.find({});
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getOneMediaItem = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id)
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createMediaItem = async (req, res) => {
  try {
    const media = await Media.create(req.body);
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateOneMediaItem = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findByIdAndUpdate(id, req.body);
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteOneMediaItem = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findByIdAndDelete(id, req.body);
    res.status(200).json({ message: "Media Item successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getMediaItems,
  getOneMediaItem,
  createMediaItem,
  updateOneMediaItem,
  deleteOneMediaItem
}