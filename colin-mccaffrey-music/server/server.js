//production
const express = require("express");
const path = require("path");
const sequelize = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({
  path: `../.env.${process.env.NODE_ENV || "dev"}`,
});

const showsRoute = require("./routes/show.route");
const releasesRoute = require("./routes/release.route");
const mediaRoute = require("./routes/media.route");
const userRoute = require("./routes/user.route");

const dbHost = process.env.DB_HOST;
const port = process.env.PORT;

const app = express();

const corsOptions = {
  origin: "*", //Allow requests from any origin
  methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
// const serveStaticOptions = {
//   dotfiles: "ignore",
//   etag: true,
//   extensions: ["html"],
//   index: false,
// };
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/shows", showsRoute);
app.use("/api/releases", releasesRoute);
app.use("/api/media", mediaRoute);
app.use("/api/users", userRoute);
app.use(
  "/assets",
  express.static(path.join(__dirname, "../src/assets/albumcovers"))
); //to allow any image uploads from the release form pointed at  "localhost:xxxx/assets" to be statically served from /assets/albumcovers folder in repo

sequelize
  .sync()
  .then(() => {
    console.log(`Data synced to ${dbHost}`);
  })
  .catch((err) => {
    console.log(`Unable to connect to the database: `, err);
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
