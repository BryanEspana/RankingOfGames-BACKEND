const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    description: String
});


const Comments = mongoose.model('Comments', CommentsSchema, 'Comments');

module.exports = Comments;
