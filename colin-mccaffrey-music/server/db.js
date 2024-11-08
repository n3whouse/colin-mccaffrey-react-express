const { Sequelize } = require("sequelize");
require("dotenv").config({
  path: `../.env.${process.env.NODE_ENV}`,
});
console.log(`Current environment: ${process.env.NODE_ENV}`);
console.log(process.env.DB_NAME);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_HOST);
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Successfully connected to ${process.env.DB_NAME}!`);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
