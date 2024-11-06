const Posts = require('../model/Posts');

// ADDING POSTS
const createPosts = async (req, res, next) => {
    try {
        const posts = await Posts(req.body)
        const savedPosts = await posts.save()
        savedPosts && res.status(200).json('post created')
    } catch (err) {
        next(err)
    }
};

module.exports = {
    createPosts
}