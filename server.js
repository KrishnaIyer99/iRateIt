const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Use Routes
app.use("/api/users", users);
app.get("/",(req,res) => {
    res.sendFile(__dirname + "/html/index.html")
})
app.get("/loginpage", (req, res) => {
    res.sendFile(__dirname + "/html/login.html");
});
app.get("/signuppage", (req, res) => {
    res.sendFile(__dirname + "/html/signup.html");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
//tested