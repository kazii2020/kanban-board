const router = require('express').Router()
const {
    createPosts,
    uploadFiles,
    getAllPosts,getPostsByID
} = require('../controllers/posts')

// ADDING POST
router.post('/add', createPosts)
//  get all tasks
router.get('/get', getAllPosts)
//  get all tasks
router.get('/get/:taskId', getPostsByID)
// ADD FILES
router.post('/uploads/:taskId', uploadFiles)


module.exports = router;