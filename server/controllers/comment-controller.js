//dependencies
const router = require('express').Router();
const db = require('../models');
const { Post, Comment } = db


//get all

router.get('/', async (req,res) => {
    try {
        const foundComments = await Comment.find()
        res.status(200).json(foundComments);

    } catch (err) {
        res.status(500).json(err);
    }
});

//get a comment by id 

router.get('/:id', async (req, res) => {
    try{
        const foundComment = await Comment.findById(req.params.id);
        await foundComment.populate('comments');
        res.status(200).json(foundComment);
    } catch (err) {
        res.status(500).json(err)
    }
})

//post comment
router.post('/', async (req, res) => {
    try{
        const createdComment = await Comment.create(req.body);
        console.log('Created Comment:', createdComment);
        res.status(200).json(createdComment)
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

//edit comment
router.put('/:id', async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.params.id, req.body,
            {runValidators: true});
        console.log('Updated comment at ID', req.params.id);
        res.status(200).json({
            message: `Updated post at ${req.params.id}`
    });
} catch (err) {
    if (err.name === 'ValidationError') {
        let errorMessage = 'Validation Error(s)'
    }
    for (let field in err.errors) {
        errorMessage += `${field} was ${err.errors[field].value}. `
        errorMessage += `${err.errors[field].message} `
    }
    console.log(errorMessage);
    res.status(500).json(errorMessage)
}
})

//delete comment
router.delete('/:id', async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        console.log(`Deleted comment`)
        res.status(200).json({
            message:   `Deleted comment`
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;