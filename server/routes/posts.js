import express from "express"
import { createPost, deletePost, getPosts, updatePost, likePost, getPostsBySearch } from "../controllers/posts.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router
.get("/", getPosts)
.get("/search", getPostsBySearch)
.post("/", auth, createPost)
.delete("/", auth, deletePost)
.patch("/:id", auth, updatePost)
.patch("/:id/likePost", auth, likePost)

export default router