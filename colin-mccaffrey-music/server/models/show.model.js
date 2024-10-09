const mongoose = require("mongoose");

const ShowSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: [true, "please enter a title"],
    },
    location: {
      type: String,
      required: [true, "please enter a location"],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    date: {
      type: Date,
      required: [true, "please choose a date"],
    },

    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Show = mongoose.model("Show", ShowSchema);

module.exports = Show;
