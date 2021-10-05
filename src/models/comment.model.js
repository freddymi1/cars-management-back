const mongoose = require("mongoose")

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        comment: String,
        user: {
            type: String
        },
        cars: {
            type: String
        },
        createdAt:{
            type:Date,
            default: Date.now()
        },
        updatedAt:{
            type:Date,
            default: Date.now()
        }
    })
);

module.exports = Comment;