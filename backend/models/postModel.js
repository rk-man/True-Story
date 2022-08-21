const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Post should be associated to a user"],
        ref: "User",
    },

    likes: {
        type: [mongoose.Schema.ObjectId],
        required: [true, "each post must have likes"],
        ref: "User",
    },

    datePosted: {
        type: Date,
        required: [true, "Each post must have a uploaded Date"],
        default: Date.now(),
    },

    Images: {
        type: [String],
        required: [true, "Each post must have atleast one image"],
    },

    description: {
        type: String,
        required: [true, "each post must have a description"],
        default: "No description",
    },
});

//whichever is posted last will be the first one to be shown
// postSchema.index({ datePosted: -1 });

postSchema.pre(/^find/, async function (next) {
    this.populate({
        path: "user",
        select: "username Image",
    });

    this.sort({ datePosted: -1 });
    next();
});

postSchema.pre("save", async function (next) {
    await this.populate({
        path: "likes",
        select: "username",
    });
    next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
