const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//Loading in User model
const User = require("../../models/User");

// GET api/users/signup
// Register user
// Public

router.post("/test", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      //Generate new user from form (right now only email&password)
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
      //bcrypt to encrypt the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//Login handler goes below

module.exports = router;
