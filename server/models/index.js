//mongoose dependencies
const mongoose = require("mongoose");
require("dotenv").config({path: "server/.env"});

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},
    () => { console.log("Connected to mongo:", process.env.MONGO_URI) }  
)

module.exports.Post = require("./post");
module.exports.Comment = require("./comment");