import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPost } from "../../features/posts/postSlice"
import { useParams } from "react-router-dom"
import moment from "moment"
import styles from "./styles.module.css"

const SinglePost = () => {
    const {singlePost} = useSelector((state) => state.post)
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(() => {
        dispatch(getPost(id))
    }, [])

    return(
        <article className={styles.container}>
            <section>
                <div>
                    <h2>{singlePost?.data?.title}</h2>
                    <p>{singlePost?.data?.tags.map((tag) => `#${tag.trim()} `)}</p>
                    <p>{singlePost?.data?.message}</p>
                    <p>Created by: {singlePost?.data?.creator}</p>
                    <h1>{moment(singlePost?.data?.createdAt).fromNow()}</h1>
                </div>
                <div>
                    Chat feature comming soon!
                </div>
                <div>
                    Comments feature comming soon!
                </div>
            </section>
            <img className={styles.post_img} src={singlePost?.data?.selectedFile}></img>
        </article>
    )
}

export default SinglePost