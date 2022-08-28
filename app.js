const express = require("express");
const app = express();
// const Client = require("./Client");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

express.json();

app.get("/", async (req, res) => {
  res.send("Our Backend works");
});

app.listen(3000, () => {
  console.log("Service running on port " + 3000);
});
