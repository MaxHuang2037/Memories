import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../features/posts/postSlice'

import Posts from "../Posts/Posts"
import Form from "../Forms/Form"
import styles from "./styles.module.css"

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [])
    return(
        <section className={styles.posts}>
            <Posts/>
            <Form/>
        </section>
    )
}

export default Home