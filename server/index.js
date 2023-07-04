import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

const URI = "mongodb+srv://user-1:gsbzss777@nodetaskmanager.7y7vy.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000

mongoose.connect(URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})).catch((err) => {
    console.log(err.message)
})