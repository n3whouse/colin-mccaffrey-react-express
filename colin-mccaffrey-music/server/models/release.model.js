const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Release = sequelize.define("Release", 
  {
    coverFile: {
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
    purchaseLink: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    timestamps: true
  }

)

module.exports = Release;