const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");

const ReleaseSchema = mongoose.Schema(
  {
    cover: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: false,
    },
    purchaseLink: {
      type: String,
      required: false,
    }
  },

)

const Release = mongoose.model("Release", ReleaseSchema);

module.exports = Release;