const { default: mongoose } = require("mongoose");
const db = require("../models");

const postId = "634aebd93e42dcc66c3c250d"

//seed comments
//run seed posts first, and replace id values with ids from new posts
db.Comment.create([{
    name: "Test Person",
    comment: "Test Comment",
    post: postId
},
{
    comment: "Test Comment",
    post: postId
}])
.then (() => {
    mongoose.connection.close(); 
});