const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
const assert = require('assert');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/iRateIt";
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const response = require("./routes/api/response");
const Entry = require("./models/Response");

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
        //used sync for clean demo, use async in production
    var _html_cont = fs.readFileSync(__dirname + '/html/index.html', {encoding: 'utf-8'});

    //dynamic content to replace
    var _repl = "";
    var activeSessions;
    var numberOfActiveSessions;
    MongoClient.connect(url, function(err, client){
        assert.equal(null, err);
        const db = client.db("iRateIt");
        findDocuments(db, function() {
            client.close();
        });
    });
    const findDocuments = function(db, callback) {
        var query = {isActive: true};
        // Get the documents collection
        const collection = db.collection('professors');
        // Find some documents
        collection.find({isActive: true}).toArray(function(err, docs) {
            assert.equal(err, null);
            activeSessions = docs;
            numberOfActiveSessions = activeSessions.length;
            var newOption;
            var newData;
            for(i = 0; i < numberOfActiveSessions; i++) {
                newData = activeSessions[i].firstname;
                newOption = "<option value = '" + newData + "'>" + newData + "</option>";
                _repl = _repl.concat(newOption);
            }
            var _im_regex = new RegExp("\\$replace_me", "gm");
            _html_cont = _html_cont.replace(_im_regex, _repl);
            res.writeHead(200, { 'content-type': 'text/html' });
            res.write(_html_cont);
            callback(docs);
        });
      }
});
app.post("/submit", (req,res) => {
    var date = ({dateTime: (new Date())});
    var data = Object.assign(req.body,date);
    const newEntry = new Entry(data);
    newEntry.save()
      .then(item => {
        res.send("Thanks");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
});
app.get("/loginpage", (req, res) => {
    res.sendFile(__dirname + "/html/login.html");
});
app.get("/signuppage", (req, res) => {
    res.sendFile(__dirname + "/html/signup.html");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
//tested