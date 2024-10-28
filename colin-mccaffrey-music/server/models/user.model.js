const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      required: true,
    },
    name: String,
    email: String,
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
  
);

const User = ("User", UserSchema);

module.exports = User;