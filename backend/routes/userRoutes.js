const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const postRouter = require("./postRoutes");
const router = express.Router();

router.use("/posts", postRouter);

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.use(authController.protect);

router.patch(
    "/my-account/edit-profile",
    userController.uploadUserProfileImage,
    userController.resizeUserProfileImage,
    userController.editUserProfile
);

module.exports = router;
