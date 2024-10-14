require("dotenv").config({ path: `../.env` });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const showsRoute = require("./routes/show.route");
const releasesRoute = require("./routes/release.route");
const mediaRoute = require("./routes/media.route");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbPath = process.env.DB_PATH;
const port = process.env.PORT || 3001 || 4000;

const app = express();

const corsOptions = {
  origin: "*", //Allow requests from any origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/shows", showsRoute);
app.use("/api/releases", releasesRoute);
app.use("/api/media", mediaRoute);

app.get("/message", (req, res) => {
  const data = { message: "Hello from the Node.js backend!" };
  res.json(data);
});


//⁡⁢⁣⁣// NEXT UP:
//        3. refer to your school projects regarding JSONwebtoken, bcrypt, and admin middleware and do some Notes about it ⁡

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@${dbPath}/`
  )
  .then(() => {
    console.log("Connected to LiminalDB!");
    app.listen(3000, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });