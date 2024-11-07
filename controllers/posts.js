const Posts = require('../model/Posts');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// ADDING POSTS
const createPosts = async (req, res, next) => {
    try {
        const posts = await Posts(req.body)
        const savedPosts = await posts.save()
        console.log("🚀 ~ createPosts ~ savedPosts:", savedPosts)
        savedPosts && res.status(200).json('task created')
    } catch (err) {
        next(err)
    }
};

// GET TASKS
const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Posts.find({})
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};

// GET POSTS BY ID
const getPostsByID = async (req, res, next) => {
    const id = req.params.taskId;
    const postObjectId = new mongoose.Types.ObjectId(id);
    try {
        const post = await Posts.findById(postObjectId);
        if (!postObjectId) {
            res.status(404).json({ message: 'post not found' })
        }
        res.status(200).json(post)
    } catch (err) {
        next(err);
    }
}


// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const fileFilter = (req, file, cb) => {
    // Allow only specific file types
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only images, PDFs, and DOC files are allowed!'));
    }
};

// Initialize multer with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});

// Controller function to handle file uploads
const uploadFiles = async (req, res) => {
    const postId = req.params.taskId;
    const postObjectId = new mongoose.Types.ObjectId(postId);

    upload.array('files', 10)(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded.' });
        }

        // Prepare file details
        const fileDetails = files.map(file => ({
            filename: file.filename,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size
        }));

    try {
        // Assuming 'files' contains the file details and 'postId' is passed in the request
        const post = await Posts.findByIdAndUpdate(
            postObjectId,
            { $set: { totalAttachments: files } },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        res.status(200).json({
            message: 'Post_updated_successfully!',
            post: post
        });
    } catch (error) {
        console.error('Error updating post with file details:', error);
        res.status(500).json({ message: 'Error updating post with file details: ' + error.message });
    }
    });
};

module.exports = {
    createPosts, uploadFiles, getAllPosts, getPostsByID
}