//mongoose dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

//comment schema
//name, comment
const commentSchema = new Schema ({
    name: { type: String, default: "Anonymous" },
    comment: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true }
});

//export
module.exports = mongoose.model("Comment", commentSchema);