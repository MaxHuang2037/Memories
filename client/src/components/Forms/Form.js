import { TextField, Button, Typography, Paper } from "@mui/material"
import { useState } from "react"
import FileBase from 'react-file-base64'
import { useDispatch } from "react-redux"
import { createPost } from "../../features/posts/postSlice"

const Form = () => {
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    })
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPost(postData))
    }

    const clear = () => {

    }

    return(
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a memory</Typography>
                <TextField name="creator" variant="outlined" lable="Creator" fullWidth value={postData.creator}
                onChange={(e) => setPostData({...postData, creator: e.target.value})}></TextField>
                <TextField name="title" variant="outlined" lable="Title" fullWidth value={postData.title}
                onChange={(e) => setPostData({...postData, title: e.target.value})}></TextField>
                <TextField name="message" variant="outlined" lable="Message" fullWidth value={postData.message}
                onChange={(e) => setPostData({...postData, message: e.target.value})}></TextField>
                <TextField name="tags" variant="outlined" lable="Tags" fullWidth value={postData.tags}
                onChange={(e) => setPostData({...postData, tags: e.target.value})}></TextField>
                <div>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}>
                    </FileBase>
                </div>
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>

        </Paper>
    )
}

export default Form