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
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: err.message})
    }
}