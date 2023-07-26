import { useEffect, useState } from "react"
import FileBase from "react-file-base64"
import { useDispatch, useSelector } from "react-redux"
import { createPost, updatePost } from "../../features/posts/postSlice"
import styles from "./styles.module.css"

const Form = ({currentPostId, setCurrentPostId, user}) => {
    const dispatch = useDispatch()
    const {posts} = useSelector((state) => state.post)
    const [postData, setPostData] = useState({
        title: "", message: "", tags: "", selectedFile: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentPostId){
            dispatch(updatePost({id: currentPostId, post: {...postData, creator: user.result.name}}))
            setCurrentPostId(null)
        }
        else {
            dispatch(createPost({...postData, creator: user.result.name}))
        }
        setPostData({
            title: "", message: "", tags: "", selectedFile: ""
        })
    }

    const clear = (e) => {
        e.preventDefault()
        setPostData({
            title: "", message: "", tags: "", selectedFile: ""
        })
    }

    useEffect(() => {
        if (currentPostId){
            const currentPost = posts.find((post) => post._id === currentPostId)
            setPostData({
                title: currentPost.title, message: currentPost.message, tags: currentPost.tags, selectedFile: currentPost.selectedFile
            })
        }
        else{
            setPostData({
                title: "", message: "", tags: "", selectedFile: ""
            })
        }
    }, [currentPostId])

    return(
        <form className={styles.postForm} onSubmit={handleSubmit} autoComplete="off">
            {user === null ? <h2>Please sign in to create a post</h2> : 
            <>
                <h2>{currentPostId ? "Editing" : "Creating"} a post</h2>
                <input required className={styles.input} placeholder="Title" value={postData.title}
                onChange={(e) => setPostData({...postData, title: e.target.value})}></input>
                <input required className={styles.input} placeholder="Message" value={postData.message}
                onChange={(e) => setPostData({...postData, message: e.target.value})}></input>
                <input required className={styles.input} placeholder="Tags (comma seperated)" value={postData.tags}
                onChange={(e) => setPostData({...postData, tags: e.target.value})}></input>
                <div>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}>
                    </FileBase>
                </div>
                <button className={styles.submit_btn} type="submit">
                    {currentPostId ? "SAVE" : "SUBMIT"}
                    
                </button>
                <button className={styles.clear_btn} onClick={clear}>CLEAR</button>
            </>}
        </form>
    )
}

export default Form