const router = require('express').Router()
const {
    createPosts,
} = require('../controllers/posts')

// ADDING POST
router.post('/add', createPosts)


module.exports = router;