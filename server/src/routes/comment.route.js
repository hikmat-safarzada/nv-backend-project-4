const express = require("express");
const verifyToken = require("../middleware/auth.middleware");
const { getComments, getCommentById, writeComment, editComment, deleteComment, getUserComments, getPostComments } = require("../controllers/comment.controller");
const validate = require("../middleware/validate");
const commentValidate = require("../validations/comment.validation")
const router = express.Router();

router.get("/", verifyToken, getComments);
router.get("/user", verifyToken, getUserComments);
router.get("/posts/:postId", verifyToken, getPostComments);
router.get("/:commentId", verifyToken, getCommentById);

router.post("/", verifyToken, validate(commentValidate), writeComment);
router.put("/:commentId", verifyToken, editComment);
router.delete("/:id", verifyToken, deleteComment);

module.exports = router