const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const responseSchema = new Schema({
    session_id: String,
    answer: Number,
    answer1: Boolean,
    answer2: Boolean,
    answer3: Boolean,
    answer4: Boolean,
    answer5: Boolean,
    dateTime: String
});

module.exports = Response = mongoose.model("response", responseSchema);
