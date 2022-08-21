const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    commentingUser: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Comment should be associated to a user "],
        ref: "User",
    },

    commentingPost: {
        type: mongoose.Schema.ObjectId,
        required: [true, "each comment should be associated to a post"],
        ref: "Post",
    },

    comment: {
        type: String,
        required: [true, "each comment should have a comment"],
    },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
