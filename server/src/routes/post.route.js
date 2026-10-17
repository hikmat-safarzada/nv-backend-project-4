const {getPosts, getPostById, getUserPosts,
    createPost, updatePost, deletePost
} = require("../controllers/post.controller")
const verifyToken  = require("../middleware/auth.middleware")
const express = require("express");
const router = express.Router();

router.get("/", verifyToken, getPosts);
router.get("/:postId", verifyToken, getPostById);
router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getUserPosts);
router.delete("/:postId", verifyToken, deletePost);
router.patch("/:postId", verifyToken, updatePost);

module.exports = router