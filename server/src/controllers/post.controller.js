const Post = require("../models/Post")

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            message: "Posts",
            posts
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getPostById = async (req, res) => {
    try {
        const {postId} = req.params;
        const post = await Post.findOne({ _id: postId });
        if (!post) {
            return res.status(404).json({
                message: "No Post Found"
            })
        }
        res.status(200).json({
            message: "Post",
            post
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const createPost = async (req, res) => {
    try {
        const { id } = req.user;
        const { title, content, category, status } = req.body
        const newPost = await Post.create({
            userId: id,
            title,
            content,
            category,
            status
        });
        res.status(201).json({
            message: "Post created successfully",
            newPost
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params
        const deletedPost = await Post.findByIdAndDelete(postId);
        if(!deletedPost){
            return res.status(404).json({
                message: "No Post Found"
            })
        }
        res.status(201).json({
            message: "Post deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findOne({ _id: postId });

        // 1. Post mövcudluğunu yoxlayırıq
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const allowedFields = [
            "title",
            "content",
            "category",
            "status"
        ];

        // 2. req.body yoxdursa, boş obyekt istifadə edirik
        const body = req.body || {};

        const updated = Object.fromEntries(
            Object.entries(body).filter(([key]) =>
                allowedFields.includes(key)
            )
        );

        // 3. Yenilənəcək məlumatları tətbiq edirik
        Object.assign(post, updated);

        await post.save();

        return res.status(200).json({
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getUserPosts = async (req, res) => {
    try {
        const {id} = req.user;
        const userPosts = await Post.find({userId: id});
        res.status(200).json({
            message: "User Posts",
            userPosts
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getPosts, getPostById,
    createPost, updatePost,
    deletePost, getUserPosts
}