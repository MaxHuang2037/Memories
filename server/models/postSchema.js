import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: String,
    selectedFile: String,
    likeCount: {
        type: [String],
        default: []
    },
    UID: String
}, { timestamps: true })

const PostMessage = mongoose.model("PostMessage", postSchema)
export default PostMessage