const express = require("express");
const router = express.Router();


// Load User model
const Entry = require("../../models/Response");


router.post("/submit", (req, res) => {
    var date = ({dateTime: (new Date())});
    var data = Object.assign(req.body,date);
    const newEntry = new Entry(data);
    console.log("route reached");
    newEntry.save()
      .then(item => {
        res.send("Thanks");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
});
  
module.exports = router;
