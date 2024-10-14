const mongoose = require("mongoose");

const ReleaseSchema = mongoose.Schema(
  {
    coverFile: {
      type: Buffer,
      required: false,
    },
    coverUrl: {
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
  }

)

const Release = mongoose.model("Release", ReleaseSchema);

module.exports = Release;