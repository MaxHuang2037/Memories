import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getPosts } from "../../features/posts/postSlice"

import Posts from "../Posts/Posts"
import Form from "../Forms/Form"
import styles from "./styles.module.css"

const Home = () => {
    const dispatch = useDispatch()
    const [currentPostId, setCurrentPostId] = useState(JSON.parse(localStorage.getItem("currentPostId")))

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    useEffect(() => {
        localStorage.setItem("currentPostId", JSON.stringify(currentPostId))
    }, [currentPostId])

    return(
        <section className={styles.posts}>
            <Posts currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>
            <Form currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>
        </section>
    )
}

export default Home