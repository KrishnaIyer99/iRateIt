const express = require('express')
const app = express()
const port = 4000
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/iRateIt");
const responseSchema = new mongoose.Schema({
    session_id: String,
    answer: Number,
    answer1: Boolean,
    answer2: Boolean,
    answer3: Boolean,
    answer4: Boolean,
    answer5: Boolean,
    dateTime: String
});

const User = mongoose.model("Responses", responseSchema);

//middleware bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/submit", (req, res) => {
    var date = ({dateTime: (new Date())})
    var data = Object.assign(req.body,date);
    var myData = new User(data);
    myData.save()
      .then(item => {
        res.send("Thanks")
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
    
  });
app.get("/login", (req, res) => {
    res.send("LoginPage");
});
app.get("/signup", (req, res) => {
    res.send("Sign Up ");
});

app.use("/",(req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.listen(port,()=>{
    console.log("Server running on port " + port)
})