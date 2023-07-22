import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    pfp: String,

}, { timestamps: true })

const user = mongoose.model("user", userSchema)
export default user