const mongoose = require("mongoose");

const ShowSchema = mongoose.Schema({
  image: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: [true, "Please enter a title"]
  },
  location: {
    type: String,
    required: [true, "Please enter a location"]
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  date: Date,
  required: true,
},
  {
    timestamps: true,
  });

const Show = mongoose.model("Product", ProductSchema);

module.exports = Show;