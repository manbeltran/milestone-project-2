//mongoose dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;
const db = require("./index");

//post schema
//name, sport, post, comments
const postSchema = new Schema ({
    name: { type: String, default: "Anonymous" },
    sport: { type: String, required: true, enum: ["Soccer", "Baseball", "Basketball", "Football", "Other"] },
    post: { type: String, required: true }
}, { toJSON: { virtuals: true } });

//virtual
postSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "post"
})

//export post
module.exports = mongoose.model("Post", postSchema);