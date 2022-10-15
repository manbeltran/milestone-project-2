//dependencies
const express = require("express");
const mongoose = require("mongoose");

//configuration
require("dotenv").config({path: ".env"});
const PORT = process.env.PORT;
const app = express();
app.use(express.json())


app.use('/comments', require('./controllers/comment-controller'));


//listen to port
app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});