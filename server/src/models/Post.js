const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model("Post", postSchema);