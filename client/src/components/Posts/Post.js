import { useDispatch } from 'react-redux'
import styles from './styles.module.css'
import { deletePost } from '../../features/posts/postSlice'

const Post = ({data}) => {
    const dispatch = useDispatch()

    return(
        <div className={styles.memory}>
            <div className={styles.upper}>
                <img className={styles.image} src={data.selectedFile} alt="memorypic"></img>
                <div id={styles.upper} className={styles.row}>
                    <h2>{data.creator}</h2>
                    <button>...</button>
                </div>
                <h3>{data.createdAt}</h3>
            </div>
            <div className={styles.lower}>
                <p>{data.tags}</p>
                <h2>{data.message}</h2>
                <div className={styles.row}>
                    <h1>Likes: {data.likeCount}</h1>
                    <button onClick={() => {dispatch(deletePost(data))}}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Post