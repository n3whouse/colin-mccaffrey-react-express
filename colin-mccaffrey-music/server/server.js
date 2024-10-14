const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const showsRoute = require("./routes/show.route");
const releasesRoute = require("./routes/release.route");
const mediaRoute = require("./routes/media.route");

const app = express();
const PORT = 3000;

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
app.use("api/media", mediaRoute);

app.get("/message", (req, res) => {
  const data = { message: "Hello from the Node.js backend!" };
  res.json(data);
});


//⁡⁢⁣⁣// NEXT UP:
//      2. put the DB_name, DB_url, username, and password in an .env file (you're going to have to install dotenv and import it like  "require("dotenv").express or something, look it up
//        3. refer to your school projects regarding JSONwebtoken, bcrypt, and admin middleware and do some Notes about it ⁡

mongoose
  .connect(
    "mongodb+srv://alexv:3XH*%3AGKZg%3BNJCFr@colin-mccaffrey.rr3t8.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to LiminalDB!");
    app.listen((3000, 3001), () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });