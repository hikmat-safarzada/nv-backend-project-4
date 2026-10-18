const Joi = require("joi");

const postValidation = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(150)
        .required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 3 characters",
            "string.max": "Title cannot exceed 150 characters",
            "any.required": "Title is required"
        }),

    content: Joi.string()
        .trim()
        .min(1)
        .max(10000)
        .required()
        .messages({
            "string.empty": "Content is required",
            "string.max": "Content cannot exceed 10000 characters",
            "any.required": "Content is required"
        }),

    category: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Category is required",
            "string.min": "Category must be at least 2 characters",
            "string.max": "Category cannot exceed 100 characters",
            "any.required": "Category is required"
        }),

    status: Joi.string()
        .valid("draft", "published")
        .optional()
        .messages({
            "any.only": "Status must be draft or published"
        })
});

module.exports = postValidation;