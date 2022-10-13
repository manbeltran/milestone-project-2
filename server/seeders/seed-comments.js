const db = require("../models");

const postId = "6348524ad27bef476d25ac40"

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