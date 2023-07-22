import { useDispatch, useSelector } from "react-redux"
import { deletePost, likePost, setCurrentPostId } from "../../features/posts/postSlice"
import styles from "./styles.module.css"
import moment from "moment"

const Post = ({data}) => {
    const dispatch = useDispatch()
    const {currentPostId} = useSelector((state) => state.post)
    
    const handleEdit = () => {
        if (currentPostId){
            return dispatch(setCurrentPostId(null))
        }
        dispatch(setCurrentPostId(data._id))
    }

    return(
        <div className={styles.memory}>
            <div className={styles.upper}>
                <img className={styles.image} src={data.selectedFile} alt="memorypic"></img>
                <div className={styles.row}>
                    <h2>{data.creator}</h2>
                    <button onClick={handleEdit}>...</button>
                </div>
                <h3>{moment(data.createdAt).fromNow()}</h3>
            </div>
            <div className={styles.lower}>
                <p>{data.tags.split(",").map((tag) => `#${tag.trim()}`)}</p>
                <h2>{data.title}</h2>
                <h3>{data.message}</h3>
                <div className={styles.row}>
                    <button onClick={() => dispatch(likePost(data._id))}>Likes: {data.likeCount}</button>
                    <button onClick={() => {dispatch(deletePost(data))}}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Post