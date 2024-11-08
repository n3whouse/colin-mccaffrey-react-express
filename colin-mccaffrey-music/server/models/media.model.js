const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Media = sequelize.define(
  "Media",
  {
    videoFile: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageFile: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Media;
