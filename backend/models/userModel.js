const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "User must have a name"],
    },

    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },

    email: {
        type: String,
        required: [true, "User must have a email id"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "User must have a password"],
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
    },

    Image: {
        type: String,
        required: [true, "User must have a image"],
        default: "default-img.png",
    },

    bio: {
        type: String,
        default: "I am awesome 😎",
    },

    role: {
        type: "String",
        enum: {
            values: ["admin", "user"],
        },
        required: [true],
        default: "user",
    },

    followers: {
        type: [mongoose.Schema.ObjectId],
        default: [],
        ref: "Follower",
    },
    following: {
        type: [mongoose.Schema.ObjectId],
        default: [],
        ref: "Follower",
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    return next();
});

userSchema.methods.comparePassword = async (
    enteredPassword,
    storedPassword
) => {
    return await bcrypt.compare(enteredPassword, storedPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
