import mongoose from "mongoose"
import PostMessage from "../models/postSchema.js"

export const getPosts = async (req, res) => {
    let {page} = req.query
    try {
        const LIMIT = 6
        const total = await PostMessage.countDocuments({})
        const totalPages = Math.ceil(total / LIMIT)
        if(page < 1 || page > totalPages){
            page = 1
        }
        let start = (Number(page) - 1) * LIMIT
        const postMessages = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(start)
        res.status(200).json({currentPage: Number(page) || 1, data: postMessages, totalPages: totalPages})
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

export const createPost = async (req, res) => {
    const body = req.body
    const UID = req.userId

    if(UID === undefined) return res.json({message: "Unauthenticated"})
    try {
        const newPost = await PostMessage.create({...body, UID: UID})
        res.status(200).json(newPost)
    } catch (error) {
        res.status(409).json({message: err.message})
    }
}

export const deletePost = async (req, res) => {
    const {id} = req.body
    const UID = req.userId

    if(UID === undefined) return res.json({message: "Unauthenticated"})
    try {
        const post = await PostMessage.findOneAndDelete({UID: UID, _id: id})
        res.status(200).json(post)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

export const updatePost = async (req, res) => {
    const {id} = req.params
    const UID = req.userId

    if(UID === undefined) return res.json({message: "Unauthenticated"})

    const body = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

    try {
        const post = await PostMessage.findOneAndUpdate({_id: id, UID: UID}, body, {new: true})
        res.status(200).json(post)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

export const likePost = async (req, res) => {
    const {id} = req.params;

    if(req.userId === undefined) return res.json({message: "Unauthenticated"})

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id")
        
        const post = await PostMessage.findById(id)

        const index = post.likeCount.findIndex((id) => id === String(req.userId))
        if (index === -1){
            post.likeCount.push(req.userId)
        } else {
            post.likeCount = post.likeCount.filter((id) => (id !== String(req.userId)))
        }
        
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})

        res.json(updatedPost)
    } catch (error) {
        res.status(404).json({message: err.message})
    }
}