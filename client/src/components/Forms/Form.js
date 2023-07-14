import { useState } from "react"
import FileBase from 'react-file-base64'
import { useDispatch } from "react-redux"
import { createPost } from "../../features/posts/postSlice"
import styles from './styles.module.css'

const Form = () => {
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    })
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPost(postData))
        setPostData({
            creator: '', title: '', message: '', tags: '', selectedFile: ''
        })
    }

    const clear = (e) => {
        e.preventDefault()
        setPostData({
            creator: '', title: '', message: '', tags: '', selectedFile: ''
        })
    }

    return(
        <form className={styles.postForm} onSubmit={handleSubmit}>
            <h2>Creating a memory</h2>
            <input className={styles.input} name="creator" placeholder="creator" value={postData.creator}
            onChange={(e) => setPostData({...postData, creator: e.target.value})}></input>
            <input className={styles.input} name="title" placeholder="title" value={postData.title}
            onChange={(e) => setPostData({...postData, title: e.target.value})}></input>
            <input className={styles.input} name="message" placeholder="message" value={postData.message}
            onChange={(e) => setPostData({...postData, message: e.target.value})}></input>
            <input className={styles.input} name="tags" placeholder="tags" value={postData.tags}
            onChange={(e) => setPostData({...postData, tags: e.target.value})}></input>
            <div>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64}) => setPostData({...postData, selectedFile: base64})}>
                </FileBase>
            </div>
            <button className={styles.submit_btn} type="submit">Submit</button>
            <button className={styles.clear_btn} onClick={clear}>Clear</button>
        </form>
    )
}

export default Form