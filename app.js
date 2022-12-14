const express = require("express");
const app = express();
const Client = require("./Client");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

express.json();
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://Rhulani:12345@cluster0.rua8w.mongodb.net/?retryWrites=true&w=majority",

  () => console.log("connected to db")
);

app.post("/", async (req, res) => {
  const client = new Client({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });
  try {
    const addedClient = await client.save();
    console.log("Client Added!");
    res.json(addedClient);
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/", async (req, res) => {
  try {
    const client = await Client.find();
    res.json(client);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/login", async (req, res) => {
  try {
    const client = await Client.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!client) {
      res.status(500).json({ message: err });
    } else {
      res.json(client);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

app.listen(3000, () => {
  console.log("Service running on port " + 3000);
});
