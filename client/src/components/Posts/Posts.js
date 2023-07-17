import Post from "./Post"
import {useSelector} from 'react-redux'
import styles from "./styles.module.css"
const Posts = () => {
    const {posts} = useSelector((state) => state.post)
    return(
        <section className={styles.container}>
            {
                (posts === undefined) ? 
                <h1>Loading...</h1> :
                posts.map((data) => {
                    return <Post key={data._id} data={data}></Post>
                })
            }
        </section>
    )
}

export default Posts