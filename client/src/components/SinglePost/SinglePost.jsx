import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPost, getPostsBySearch } from "../../features/posts/postSlice"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"
import styles from "./styles.module.css"
import CommentSection from "./CommentSection"

const SinglePost = ({user}) => {
    const {singlePost, posts, isLoading, isLoadingSinglePost} = useSelector((state) => state.post)
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openPost = (id) => {
        navigate(`/posts/${id}`)
    }

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    useEffect(() => {
        if(singlePost){
            dispatch(getPostsBySearch({searchQuery: "none", tags: singlePost?.tags?.join(",")}))
        }
    }, [singlePost._id])
    
    const recommendedPosts = posts.filter(({_id}) => _id !== singlePost?._id)
    
    if(isLoading || isLoadingSinglePost){
        return <h2>Loading...</h2>
    }

    return(
        <>
            <article className={styles.container}>
                <section className={styles.left}>
                    <div>
                        <h2 className={styles.title}>{singlePost?.title}</h2>
                        <p className={styles.tags}>{singlePost?.tags?.map((tag) => `#${tag.trim()} `)}</p>
                        <p>{singlePost?.message}</p>
                        <p>Created by: {singlePost?.creator}</p>
                        <h1>{moment(singlePost?.createdAt).fromNow()}</h1>
                    </div>
                    <CommentSection user={user} id={singlePost?._id} comments={singlePost?.comments}/>
                </section>
                <figure className={styles.post_img}>
                    <img className={styles.img} src={singlePost?.selectedFile} alt="Post"></img>
                </figure>
            </article>
            <article className={styles.container}>
                <h2>You might also like:</h2>
                <div className={styles.recommendedPosts}>
                    {
                        recommendedPosts !== undefined && (
                            recommendedPosts.map(({title, message, likeCount, creator, _id}) => {
                                return <section onClick={() => openPost(_id)} className={styles.post} key={_id}>
                                    <h1>{title}</h1>
                                    <p>{creator}</p>
                                    <p>{message}</p>
                                    <p>Likes: {likeCount.length}</p>
                                </section>
                            })
                        )
                    }
                </div>
            </article>
        </>
    )
}

export default SinglePost