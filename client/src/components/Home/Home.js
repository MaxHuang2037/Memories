import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getPosts } from "../../features/posts/postSlice"

import Posts from "../Posts/Posts"
import Form from "../Forms/Form"
import styles from "./styles.module.css"

const Home = ({user}) => {
    const dispatch = useDispatch()
    const [currentPostId, setCurrentPostId] = useState(null)

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    return(
        <section className={styles.posts}>
            <Posts user={user} currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>
            <Form user={user} currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>
        </section>
    )
}

export default Home