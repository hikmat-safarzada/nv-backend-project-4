const {getPosts, getPostById, getUserPosts,
    createPost, updatePost, deletePost
} = require("../controllers/post.controller")
const verifyToken  = require("../middleware/auth.middleware");
const validate = require("../middleware/validate")
const postValidate = require("../validations/post.validation")
const express = require("express");
const router = express.Router();

router.get("/", verifyToken, getPosts);
router.get("/:postId", verifyToken, getPostById);
router.post("/", verifyToken, validate(postValidate), createPost);
router.get("/user", verifyToken, getUserPosts);
router.delete("/:postId", verifyToken, deletePost);
router.patch("/:postId", verifyToken, updatePost);

module.exports = router