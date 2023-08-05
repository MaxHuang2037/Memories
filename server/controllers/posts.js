import mongoose from "mongoose"
import PostMessage from "../models/postSchema.js"

export const getPostsBySearch = async (req, res) => {
    let {searchQuery, tags, page} = req.query
    try {
        const title = new RegExp(searchQuery, "i") // ignore case
        const LIMIT = 6
        const total = await PostMessage.countDocuments({ $or: [ {title: title}, {tags: {$in: tags.split(",")}}]})
        const totalPages = Math.ceil(total / LIMIT)
        if(page < 1 || page > totalPages){
            page = 1
        }
        let start = (Number(page) - 1) * LIMIT
        const postMessages = await PostMessage.find({ $or: [ {title}, {tags: {$in: tags.split(",")}}]}).sort({_id: -1}).limit(LIMIT).skip(start)
        res.status(200).json({currentPage: Number(page) || 1, data: postMessages, totalPages: totalPages})
    } catch(err) {
        res.status(404).json({message: err.message})
    }
}

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

export const getPost = async (req, res) => {
    let {id} = req.params
    try {
        const post = await PostMessage.findById(String(id))
        res.status(200).json({data: post})
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
    let {likeCount} = req.body;
    
    if(req.userId === undefined) return res.json({message: "Unauthenticated"})
    
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id")
        
        const index = likeCount.findIndex((id) => id === String(req.userId))
        if (index === -1){
            likeCount.push(req.userId)
        } else {
            likeCount = likeCount.filter((id) => (id !== String(req.userId)))
        }
        
        const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: likeCount}, {new: true})

        res.json(updatedPost)
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}