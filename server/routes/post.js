import express from "express"
import { createPost, deletePost, getPosts } from "../controllers/posts.js"

const router = express.Router()

router
.get("/", getPosts)
.post("/create", createPost)
.delete("/delete", deletePost)

export default router