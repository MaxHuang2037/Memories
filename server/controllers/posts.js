import mongoose from "mongoose"
import PostMessage from "../models/postSchema.js"

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

export const createPost = async (req, res) => {
    const body = req.body;
    try {
        const newPost = await PostMessage.create(body)
        res.status(200).json(newPost)
    } catch (error) {
        res.status(409).json({message: err.message})
    }
}

export const deletePost = async (req, res) => {
    const {id} = req.body
    try {
        const post = await PostMessage.findOneAndDelete({_id: id})
        res.status(200).json(post)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

export const updatePost = async (req, res) => {
    const {id} = req.params
    const body = req.body
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No post with that id")
    }
    try {
        const post = await PostMessage.findOneAndUpdate({_id: id}, body, {new: true})
        res.status(200).json(post)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}