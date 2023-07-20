import { useEffect, useState } from "react"
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux"
import { createPost, updatePost, setCurrentPostId } from "../../features/posts/postSlice"
import styles from './styles.module.css'

const Form = () => {
    const dispatch = useDispatch()
    const {currentPostId, posts} = useSelector((state) => state.post)
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentPostId){
            dispatch(updatePost({id: currentPostId, post: postData}))
            dispatch(setCurrentPostId(null))
        }
        else {
            dispatch(createPost(postData))
        }
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

    useEffect(() => {
        if (currentPostId){
            const currentPost = posts.find((post) => post._id === currentPostId)
            setPostData({
                creator: currentPost.creator, title: currentPost.title, message: currentPost.message, tags: currentPost.tags, selectedFile: currentPost.selectedFile
            })
        }
        else{
            setPostData({
                creator: '', title: '', message: '', tags: '', selectedFile: ''
            })
        }
    }, [currentPostId])

    return(
        <form className={styles.postForm} onSubmit={handleSubmit} autoComplete="off">
            <h2>{currentPostId ? 'Editing' : 'Creating'} a post</h2>
            <input required className={styles.input} placeholder="Creator" value={postData.creator}
            onChange={(e) => setPostData({...postData, creator: e.target.value})}></input>
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
                {currentPostId ? 'SAVE' : 'SUBMIT'}
                
            </button>
            <button className={styles.clear_btn} onClick={clear}>CLEAR</button>
        </form>
    )
}

export default Form