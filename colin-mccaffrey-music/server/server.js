require("dotenv").config({ path: `../.env` });
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const showsRoute = require("./routes/show.route");
const releasesRoute = require("./routes/release.route");
const mediaRoute = require("./routes/media.route");
const userRoute = require("./routes/user.route");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbPath = process.env.DB_PATH;
const port = process.env.PORT;

const app = express();

const corsOptions = {
  origin: "*", //Allow requests from any origin
  methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

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

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbPath}/`)
  .then(() => {
    console.log(`Connected to ${dbPath}!`);
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });
