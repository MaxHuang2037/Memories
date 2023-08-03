import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPost, getPostsBySearch } from "../../features/posts/postSlice"
import { useParams } from "react-router-dom"
import moment from "moment"
import styles from "./styles.module.css"

const SinglePost = () => {
    const {singlePost, posts} = useSelector((state) => state.post)
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    useEffect(() => {
        if(singlePost){
            dispatch(getPostsBySearch({searchQuery: "none", tags: singlePost?.data?.tags.join(",")}))
        }
    }, [singlePost])

    const recommendedPosts = posts.filter(({_id}) => _id !== singlePost?.data?._id)
    return(
        <>
            <article className={styles.container}>
                <section>
                    <div>
                        <h2 className={styles.title}>{singlePost?.data?.title}</h2>
                        <p className={styles.tags}>{singlePost?.data?.tags.map((tag) => `#${tag.trim()} `)}</p>
                        <p>{singlePost?.data?.message}</p>
                        <p>Created by: {singlePost?.data?.creator}</p>
                        <h1>{moment(singlePost?.data?.createdAt).fromNow()}</h1>
                    </div>
                    <div>
                        Comments feature coming soon!
                    </div>
                </section>
                <img className={styles.post_img} src={singlePost?.data?.selectedFile} alt="Post"></img>
            </article>
            <article className={styles.container}>
                <h2>You might also like:</h2>
                <div className={styles.recommendedPosts}>
                    {
                        recommendedPosts.length > 0 && (
                            recommendedPosts.map(({title, message, likeCount, creator, _id}) => (
                                <section className={styles.post} key={_id}>
                                    <h1>{title}</h1>
                                    <p>{creator}</p>
                                    <p>{message}</p>
                                    <p>Likes: {likeCount.length}</p>
                                </section>
                            ))
                        )
                    }
                </div>
            </article>
        </>
    )
}

export default SinglePost