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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})