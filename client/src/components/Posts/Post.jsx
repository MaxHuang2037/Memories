import { useDispatch } from "react-redux"
import { deletePost, likePost } from "../../features/posts/postSlice"
import styles from "./styles.module.css"
import moment from "moment"

const Post = ({data, currentPostId, setCurrentPostId, user}) => {
    const dispatch = useDispatch()
    const isSameUser = user?.result?._id === data?.UID || user?.result?.sub === data?.UID
    const tags = data.tags.map((tag) => `#${tag.trim()}`)

    const handleEdit = () => {
        if (currentPostId){
            return setCurrentPostId(null)
        }
        setCurrentPostId(data._id)
    }

    return(
        <div className={styles.memory}>
            <div className={styles.upper}>
                <img className={styles.image} src={data.selectedFile} alt="memorypic"></img>
                <div className={styles.row}>
                    <h2 className={styles.header}>{data.creator}</h2>
                    {isSameUser && <button className={styles.edit_btn} onClick={handleEdit}>...</button>}
                </div>
                <h3>{moment(data.createdAt).fromNow()}</h3>
            </div>
            <div>
                <p>{tags}</p>
                <h2>{data.title}</h2>
                <h3>{data.message}</h3>
                <div className={styles.row}>
                    <button disabled={!user?.result} onClick={() => dispatch(likePost(data._id))}>Likes: {data.likeCount.length}</button>
                    {isSameUser && <button onClick={() => dispatch(deletePost(data._id))}>Delete</button>}
                </div>
            </div>
        </div>
    )
}

export default Post