const express = require("express");
const router = express.Router();
const Media = require("../models/media.model");

const getMediaItems = async (req, res) => {
  try {
    const media = await Media.findAll({});
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneMediaItem = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findByPk(id);
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMediaItem = async (req, res) => {
  try {
    const { videoUrl, imageUrl, title, description, category } = req.body;
    const videoFile = `${process.env.DB_HOST}/${req.file.filename}`;
    const imageFile = `${process.env.DB_HOST}/${req.file.filename}`;

    const media = await Media.create(req.body);
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOneMediaItem = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Media.update(id, req.body, {
      where: {
        id: id,
      },
    });
    if (!updated) {
      return res.status(404).json({ message: "Media item not found" });
    }
    const updatedMedia = await User.findByPk(id);
    res.status(200).json(updatedMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOneMediaItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Media.destroy({
      where: {
        id: id,
      },
    });
    if (!updated) {
      return res.status(404).json({ message: "User Not Deleted" });
    }
    res.status(204).send({ message: "Media Item successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMediaItems,
  getOneMediaItem,
  createMediaItem,
  updateOneMediaItem,
  deleteOneMediaItem,
};
