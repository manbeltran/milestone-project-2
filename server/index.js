//dependencies
const express = require("express");

//configuration
require("dotenv").config({path: ".env"});
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

//GET /
app.get("/", (req, res) => {
    res.json({
        message: "Use /posts or /comments for data"
    })
})

//import controllers and use

// /posts
app.use("/posts", require("./controllers/posts-controller"));

//listen to port
app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});