import Post from "./Post"
import {useSelector} from "react-redux"
import styles from "./styles.module.css"
const Posts = ({currentPostId, setCurrentPostId}) => {
    const {posts} = useSelector((state) => state.post)
    return(
        <section className={styles.container}>
            {
                (posts === undefined) ? 
                <h1>Loading...</h1> :
                posts.map((data) => {
                    return <Post currentPostId={currentPostId} setCurrentPostId={setCurrentPostId} key={data._id} data={data}></Post>
                })
            }
        </section>
    )
}

export default Posts