const express = require("express");
const port = 4000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//middleware bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config

//Connect to mongodb

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
