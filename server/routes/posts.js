import express from "express"
import { createPost, deletePost, getPosts, updatePost } from "../controllers/posts.js"

const router = express.Router()

router
.get("/", getPosts)
.post("/", createPost)
.delete("/", deletePost)
.patch("/:id", updatePost)

export default router