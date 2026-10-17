const express = require("express");
const verifyToken = require("../middleware/auth.middleware");
const { getComments, getCommentById, writeComment, editComment, deleteComment, getUserComments } = require("../controllers/comment.controller");
const router = express.Router();

router.get("/", verifyToken, getComments);
router.get("/:commentId", verifyToken, getCommentById);
router.post("/", verifyToken, writeComment);
router.patch("/:commentId", verifyToken, editComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/", verifyToken, getUserComments);

module.exports = router