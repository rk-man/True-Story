const express = require("express");
const catchAsync = require("express-async-handler");
const User = require("./../models/userModel");
const multer = require("multer");
const sharp = require("sharp");
const appError = require("./../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new appError("Not an image!...please upload an image", 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadUserProfileImage = upload.single("Image");

exports.resizeUserProfileImage = catchAsync(async (req, res, next) => {
    if (req.file) {
        const filename = `user-profile-${req.user._id}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(180, 180)
            .toFormat("jpeg")
            .jpeg({
                quality: 90,
            })
            .toFile(`${__dirname}/../public/images/user-profiles/${filename}`);
        req.body.Image = filename;
    }
    next();
});

exports.editUserProfile = catchAsync(async (req, res, next) => {
    const updatableObj = {};
    if (req.body.username) {
        updatableObj.username = req.body.username;
    }

    if (req.body.Image) {
        updatableObj.Image = req.body.Image;
    }

    if (req.body.bio) {
        updatableObj.bio = req.body.bio;
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        updatableObj,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
});
