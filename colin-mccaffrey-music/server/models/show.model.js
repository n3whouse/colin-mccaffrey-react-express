const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Show = sequelize.define(
  "Show",
  {
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Show;
