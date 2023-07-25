import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    picture: {
        type: String, 
        default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
    },
}, { timestamps: true })

const User = mongoose.model("user", userSchema)
export default User