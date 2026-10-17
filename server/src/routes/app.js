const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
const authRouter = require("./auth.route")
const postRouter = require("./post.route")
const commentRouter = require("./comment.route")
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/comments", commentRouter)
module.exports = app