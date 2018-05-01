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
const signupSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    schoolname: String,
    email: String,
    password: String,
    confirmpassword: String
})

//middleware bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/submit", (req, res) => {
    var User = mongoose.model("Responses", responseSchema);
    var date = ({dateTime: (new Date())});
    var data = Object.assign(req.body,date);
    var myData = new User(req.body);
    myData.save()
      .then(item => {
        res.send("Thanks");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });

  });

app.post("/signupattempt", (req, res) => {
    if(req.body.password == req.body.confirmpassword){
        //signup code
        var User = mongoose.model("Professors", signupSchema);
        var professor = new User(req.body);
        professor.save()
            .then(item => {
                res.send("Sucessfully created account");
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            })
    }
    else{
        res.send("Error: passwords must match");
    }
  /*var data = new User(req.body);
  var obj = JSON.parse(req.body);
  mongoose.createCollection(obj.name, {
    capped: false,
    validationLevel: "strict",
    validationAction: "error",
    viewOn: "responses",
  })
  data.save()
    .then(item => {
      res.send("Sign up attempt succesful");
    })
    .catch(err => {
      res.status(400).send("Sign up attempt failed");
    });*/
});


app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

//Kai, use this handler for login attempts
/*app.post("/loginattempt", (req, res) => {
    res.send("Login Attempt");
});*/

app.use("/",(req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.listen(port,()=>{
    console.log("Server running on port " + port)
})
