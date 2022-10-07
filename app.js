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
    token: req.body.token,
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

app.put("/addFriend", async (req, res) => {
  try {
    console.log(req.body);
    const friend = await Client.findOne({
      email: req.body.friendEmail,
    });

    console.log(friend.name);
    const friendAddded = await Client.updateOne(
      { email: req.body.email },
      {
        $push: {
          friends: {
            name: friend.name,
            email: req.body.friendEmail,
            token: friend.token,
          },
        },
      }
    );
    if (!friendAddded) {
      res.status(500).json({ message: err });
    } else {
      res.json(friendAddded);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/sendPanic", async (req, res) => {
  try {
    console.log(req.token);
    const panic = await Client.findOne({
      token: req.body.token,
    });
    res.json(panic.friends);
  } catch (err) {
    res.json({ message: err });
  }
});
app.listen(3000, () => {
  console.log("Service running on port " + 3000);
});
