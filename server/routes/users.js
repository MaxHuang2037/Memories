import express from "express"
import {signIn, signUp} from "../controllers/users.js"

const router = express.Router()

router
.post("/signIn", signIn)
.post("/signUp", signUp)

export default router