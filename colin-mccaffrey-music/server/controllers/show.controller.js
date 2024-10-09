const express = require("express");
const router = express.Router();
const Show = require("../models/show.model");

const getShows = async (req, res) => {
  try {
    const shows = await Show.find({});
    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getOneShow = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findById(id)
    res.status(200).json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createShow = async (req, res) => {
  try {
    const show = await Show.create(req.body);
    res.status(201).json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateOneShow = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findByIdAndUpdate(id, req.body);
    res.status(200).json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteOneShow = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findByIdAndDelete(id, req.body);
    res.status(200).json({ message: "Show successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getShows,
  getOneShow,
  createShow,
  updateOneShow,
  deleteOneShow
}