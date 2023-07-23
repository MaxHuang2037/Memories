import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    pfp: {
        type: String, 
        default: "picture"
    },
}, { timestamps: true })

const User = mongoose.model("user", userSchema)
export default User