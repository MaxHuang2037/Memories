import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: [String],
        default: []
    },
    comments: [[String, String]],
    UID: String
}, { timestamps: true })

const PostMessage = mongoose.model("PostMessage", postSchema)
export default PostMessage