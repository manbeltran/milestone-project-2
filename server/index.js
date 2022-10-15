//dependencies
const express = require("express");

//configuration
require("dotenv").config({path: ".env"});
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

//testing routes
//find all bakers + breads
// const db = require("./models");
// const { Post } = db;
// app.get("/", (req, res) => {
//     Post.find()
//         .populate("comments")
//         .then(foundPosts => {
//             res.json(foundPosts);
//         })
// });

// //test delete Post + comments
// app.get("/:id", (req, res) => {
//     Post.findById(req.params.id)
//         .populate("comments")
//         .then(foundPost => {
//             if (foundPost.comments) {
//                 foundPost.comments.forEach(comment => {
//                     comment.remove()
//                     .then(deleteStatus => {
//                         console.log("DELETING COMMENT:", deleteStatus);
//                     })
//                 })
//             }
//             foundPost.remove()
//             .then(deleteStatus => {
//                 console.log("DELETING POST:", deleteStatus);
//             })
//         })
// })

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