const db = require("../models");

//seed posts
//run node seed-posts.js
db.Post.create([{
    name: "Test Person",
    sport: "Soccer",
    post: "Test Content"    
},
{
    sport: "Baseball",
    post: "Test Content 2" 
},
{
    name: "Test Person 2",
    sport: "Basketball",
    post: "Test Content 3" 
}])
.then (() => {
    mongoose.connection.close(); 
});