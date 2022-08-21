const express = require("express");
const authController = require("./../controllers/authController");
const postController = require("./../controllers/postController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route("/all-posts").get(postController.getOverallPosts);


router
    .route("/")
    .post(
        postController.uploadImagesforPosts,
        postController.resizePostImages,
        postController.createPost
    )
    .get(postController.getAllPosts);

router
    .route("/:postId")
    .patch(postController.updatePost)
    .delete(postController.deletePost);

//add like or remove like from a specific post
router.route("/:postId/likes").patch(postController.addOrRemoveLikeToSpecificPost);

module.exports = router;
