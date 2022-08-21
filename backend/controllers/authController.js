const catchAsync = require("express-async-handler");
const User = require("./../models/userModel");
const appError = require("./../utils/appError");
const jwt = require("jsonwebtoken");

const createAndSendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        data: {
            user,
        },
        token,
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body);

    if (!user) {
        return next(new appError(400, "couldn't create user...try again"));
    }

    createAndSendToken(user, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new appError(400, "User hasn't logged in yet"));
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({ _id: decoded.id });

    console.log(user);

    if (!user) {
        return next(
            new appError(
                400,
                "User associated with that token has been expired"
            )
        );
    }

    req.user = user;

    return next();
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email | !password) {
        return next(new appError(400, "Include all fields while logging in"));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new appError(404, "No user exist with that email Id"));
    }

    if (!user.comparePassword(password, user.password)) {
        return next(new appError(400, "Password is incorrect"));
    }

    createAndSendToken(user, 200, res);
});
