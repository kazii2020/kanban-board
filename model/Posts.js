const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: 'pending'
    },
    category: {
        type: String,
        required: true,
    },
    viewers: {
        type: Number,
        default:0
    },

    published: {
        type: Boolean,
        default: false,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    source: {
        type: String,
    }
}, {
    timestamps: true,
});

const Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;
