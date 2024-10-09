const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const showsRoute = require("./routes/show.route");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/shows", showsRoute);

app.get("/message", (req, res) => {
  const data = { message: "Hello from the Node.js backend!" };
  res.json(data);
});


//⁡⁢⁣⁣// NEXT UP:
//     1. wrap the mongoose.connect function around it and...
//      2. put the DB_name, DB_url, username, and password in an .env file (you're going to have to install dotenv and import it like  "require("dotenv").express or something, look it up
//        3. refer to your school projects regarding JSONwebtoken, bcrypt, and admin middleware and do some Notes about it ⁡

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})