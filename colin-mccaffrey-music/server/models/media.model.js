const mongoose = require("mongoose");

const MediaSchema = mongoose.Schema(
  {
    videoLink: String,
    imageLink: String,
    title: String,
    description: String,
    category: String,
  },

)

const Media = mongoose.model("Media", MediaSchema);

module.exports = Media;