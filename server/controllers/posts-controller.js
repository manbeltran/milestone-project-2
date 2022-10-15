//dependencies and router setup
const router = require("express").Router();
const db = require("../models");
const { Post, Comment } = db;


//GET all posts
router.get("/", async (req, res) => {
    try {
        const foundPosts = await Post.find();
        res.status(200).json(foundPosts);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET a post by id and all related comments
router.get("/:id", async (req, res) => {
    try{
        const foundPost = await Post.findById(req.params.id);
        await foundPost.populate("comments");
        res.status(200).json(foundPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//POST a new post
router.post("/", async (req, res) => {
    try {
        const createdPost = await Post.create(req.body);
        console.log("Created Post:", createdPost);
        res.status(200).json(createdPost);
    } catch (err) {
        if (err.name === "ValidationError") {
            let errorMessage = "Validation Error(s): "
            for (let field in err.errors) {
                errorMessage += `${field} was ${err.errors[field].value}. `
                errorMessage += `${err.errors[field].message} `
            }
            console.log(errorMessage);
            res.status(500).json(errorMessage)
        }
    }
});

//PUT a post
router.put("/:id", async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, req.body,
            {runValidators: true}    
        );
        console.log("Updated post at ID", req.params.id);
        res.status(200).json({
            message: `Updated post at ${req.params.id}`
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            let errorMessage = "Validation Error(s): "
            for (let field in err.errors) {
                errorMessage += `${field} was ${err.errors[field].value}. `
                errorMessage += `${err.errors[field].message} `
            }
            console.log(errorMessage);
            res.status(500).json(errorMessage)
        }
    }
})

//DELETE a post and all related comments
router.delete("/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        const deletedComments = await Comment.deleteMany({post: req.params.id});
        console.log(`Deleted post and ${deletedComments.deletedCount} comments`);
        res.status(200).json({
            message: `Deleted post and ${deletedComments.deletedCount} comments`
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


//export
module.exports = router;