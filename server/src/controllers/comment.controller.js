// getComments, writeComment, editComment, deleteComment
const Comment = require("../models/Comment")
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json({
            message: "Comments",
            comments
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getUserComments = async (req, res) => {
    try {
        const { id } = req.user
        const userComments = await Comment.find({ userId: id });
        res.status(200).json({
            message: "User Comments",
            userComments
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

const getPostComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId });
        if (comments.length === 0) {
            return res.status(404).json({
                message: "No Comment Found"
            })
        }
        res.status(200).json({
            message: "Post Comments",
            comments
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getCommentById = async (req, res) => {
    try {
        const { commentId } = req.params
        const comment = await Comment.findOne({ _id: commentId });
        if (!comment) {
            return res.status(404).json({
                message: "Comment Not found"
            })
        }
        res.status(200).json({
            message: "Comment",
            comment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const writeComment = async (req, res) => {
    try {
        const { id } = req.user
        const { postId, content } = req.body
        const newComent = await Comment.create({
            userId: id,
            postId,
            content
        })
        res.status(201).json({
            message: "Comment shared",
            newComent
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params
        const comment = await Comment.findByIdAndDelete(id)
        if (!comment) {
            return res.status(404).json({
                message: "No comment found"
            })
        }
        res.status(201).json({
            message: "Comment deleted successfully!",
            comment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findOne({ _id: commentId });
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            })
        }
        const allowedFields = ["content"]
        const updates = Object.fromEntries(
            Object.entries(req.body).filter(
                ([key]) => allowedFields.includes(key)
            )
        )
        Object.assign(comment, updates)
        await comment.save();
        res.status(201).json({
            message: "Comment edited successfully",
            comment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    getComments, writeComment,
    deleteComment, editComment,
    getUserComments, getCommentById,
    getPostComments
}