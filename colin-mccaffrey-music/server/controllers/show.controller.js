const express = require("express");
const router = express.Router();
const Show = require("../models/show.model");

const getShows = async (req, res) => {
  console.log("test");
  try {
    const shows = await Show.findAll({});
    console.log(shows);
    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneShow = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findByPk(id);
    res.status(200).json(show);
    update;
    res.status(500).json({ message: error.message });
  } catch (error) {
    res.status(500).json({
      message: "Show not found",
    });
  }
};

const createShow = async (req, res) => {
  try {
    const showData = {
      imageUrl: req.file ? req.file.path : null,
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      date: req.body.date,
      description: req.body.description,
    };

    console.log("Received Data:", showData);

    const show = await Show.create(req.body);
    res.status(201).json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOneShow = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Show.update(id, req.body, {
      where: {
        id: id,
      },
    });
    if (!updated) {
      return res.status(404).json({ message: "Show not found" });
    }
    res.status(200).json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOneShow = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Show successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getShows,
  getOneShow,
  createShow,
  updateOneShow,
  deleteOneShow,
};
