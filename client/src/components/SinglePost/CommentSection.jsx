import { useState } from "react"
import styles from "./styles.module.css"
import { useDispatch } from "react-redux"
import { commentPost } from "../../features/posts/postSlice"

const CommentSection = ({comments, id, user}) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState([user?.name, ""])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(commentPost({id: id, comments: [...comments, comment]}))
        setComment([user?.name, ""])
    }

    if (comments === undefined){
        return <h1>loading...</h1>
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Comments</h2>
            <section className={styles.commentSection}>
                {
                    comments.map((comment, index) => {
                        return <h1 key={index}>{comment[0]}: {comment[1]}</h1>
                    })
                }
            </section>
            <input value={comment[1]} onChange={(e) => setComment([user?.result?.name, e.target.value])}></input>
        </form>
    )
}

export default CommentSection