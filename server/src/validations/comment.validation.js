const Joi = require("joi");

const commentValidation = Joi.object({
    postId: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.empty": "Post ID is required",
            "string.hex": "Post ID must be a valid ObjectId",
            "string.length": "Post ID must be 24 characters long",
            "any.required": "Post ID is required"
        }),

    content: Joi.string()
        .trim()
        .min(1)
        .max(2000)
        .required()
        .messages({
            "string.empty": "Comment content is required",
            "string.max": "Comment cannot exceed 2000 characters",
            "any.required": "Comment content is required"
        })
});

module.exports = commentValidation;