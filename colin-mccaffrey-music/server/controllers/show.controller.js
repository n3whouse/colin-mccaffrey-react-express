const express = require("express");
const Show = require("../models/show.model");

const getShows = async (req, res) => {
  try {
    const shows = await Show.findAll({});
    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneShow = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findByPk(id);
    return res.status(200).json(show);
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

    const show = await Show.create(showData);
    res.status(201).json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOneShow = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Show.update(req.body, {
      where: {
        id: id,
      },
    });
    if (updated) {
      const updatedShow = await Show.findByPk(id);
      return res.status(200).json(updatedShow);
    }
  } catch (error) {
    res.status(404).json({ message: "Show Not Found" });
  }
};

const deleteOneShow = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Show.destroy({
      where: {
        id: id,
      },
    });
    if (deleted) {
      res.status(200).json({ message: "Show successfully deleted!" });
    }
  } catch (error) {
    res.status(404).json({ message: "Show Not Found" });
  }
};

module.exports = {
  getShows,
  getOneShow,
  createShow,
  updateOneShow,
  deleteOneShow,
};
