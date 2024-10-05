const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/message", (req, res) => {
  const data = { message: "Hello from the Node.js backend!" };
  res.json(data);
});

// ⁡⁣⁢ SO RIGHT NOW... the whole folder nonsense has been fixed and the single endpoint up here works. Which means..⁡
// ⁡⁢⁣⁣ NEXT UP: 
//   1. Build out the model FIRST and export it, since the controller file has the model to take in request bodies from the endpoints....
//     2. THEN... build controller file, import the model file, and build the getAllShows, getShow, createShow, updateShow, deleteShow functions and export them to the...
//       3.  ...ROUTER file, where you'll import express, the model file, express.Router() as router and import the destructured controller functions from the controller file, then build out the six endpoints e.g. router.get("/", getAllShows) and export them as "router". */⁡
// ⁡⁣⁢⁣/* 𝗔𝗙𝗧𝗘𝗥 𝗧𝗛𝗔𝗧... 𝘆𝗼𝘂 𝗵𝗮𝘃𝗲 𝘁𝗵𝗶𝘀 𝗹𝗶𝘀𝘁𝗲𝗻𝗲𝗿 𝗱𝗼𝘄𝗻 𝗵𝗲𝗿𝗲 𝗮𝗻𝗱 𝘆𝗼𝘂 𝗵𝗮𝘃𝗲 𝘁𝗼 𝗱𝗼 𝘁𝗵𝗲 𝗳𝗼𝗹𝗹𝗼𝘄𝗶𝗻𝗴: */

// ⁡⁢⁣⁣// NEXT UP:
//     1. wrap the mongoose.connect function around it and...
//      2. put the DB_name, DB_url, username, and password in an .env file (you're going to have to install dotenv and import it like  "require("dotenv").express or something, look it up
//        3. refer to your school projects regarding JSONwebtoken, bcrypt, and admin middleware and do some Notes about it ⁡

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})