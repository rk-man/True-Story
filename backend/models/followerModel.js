const mongoose = require("mongoose");

const followerSchema = mongoose.Schema({
    followingUser: {
        type: mongoose.Schema.ObjectId,
        required: [true, "follower should be associated to a user "],
        ref: "User",
    },

    followedBy: {
        type: mongoose.Schema.ObjectId,
        required: [true, "follower should be associated to a user"],
        ref: "User",
    },
});

const Follower = mongoose.model("Follower", followerSchema);
module.exports = Follower;
