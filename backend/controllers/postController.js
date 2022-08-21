const catchAsync = require("express-async-handler");
const Post = require("./../models/postModel");
const appError = require("./../utils/appError");

const path = require("path");

//for file uploads
const multer = require("multer");
const sharp = require("sharp");

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

exports.uploadImagesforPosts = upload.array("Images", 1);

exports.resizePostImages = catchAsync(async (req, res, next) => {
    if (req.files.length == 0) {
        return next(new appError(400, "Please upload atleast one image"));
    }

    req.body.Images = [];

    const allPromises = req.files.map(async (img, index) => {
        const filename = `post-${req.user.id}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
            .resize(1080, 1080)
            .toFormat("jpeg")
            .jpeg({
                quality: 90,
            })
            .toFile(`${__dirname}/../public/images/users/${filename}`);
        req.body.Images.push(filename);
    });

    await Promise.all(allPromises);
    next();
});

exports.createPost = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const post = await Post.create({
        ...req.body,
        user: req.user._id,
    });
    console.log(post);

    if (!post) {
        return next(new appError("Couldn't create new post...try again"));
    }

    res.status(201).json({
        status: "success",
        data: {
            post,
        },
    });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
    const posts = await Post.find({ user: req.user._id });

    if (!posts) {
        return next(new appError(400, "couldn't get posts...try again"));
    }

    res.status(200).json({
        status: "success",
        data: {
            posts,
        },
    });
});

exports.getOverallPosts = catchAsync(async (req, res, next) => {
    const posts = await Post.find();

    if (!posts) {
        return next(new appError(400, "couldn't load posts...try again"));
    }

    res.status(200).json({
        status: "success",
        data: {
            posts,
        },
    });
});

exports.updatePost = catchAsync(async (req, res, next) => {
    const filteredBody = {};

    if (req.body.description) {
        filteredBody.description = req.body.description;
    }

    const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        filteredBody,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(203).json({
        status: "success",
        data: {
            post: updatedPost,
        },
    });
});

exports.deletePost = catchAsync(async (req, res, next) => {
    await Post.findByIdAndDelete(req.params.postId);

    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.addOrRemoveLikeToSpecificPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    // console.log(post);

    let index = -1;

    index = post.likes.findIndex((like) => {
        return like._id.toString() === req.user._id.toString();
    });

    if (index !== -1) {
        post.likes.splice(index, 1);
    } else {
        post.likes.push(req.user._id);
    }

    await post.save({ validateBeforeSave: true });

    return res.status(200).json({
        status: "success",
        data: {
            post,
        },
    });
});
