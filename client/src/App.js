import React, { useEffect } from 'react'
import memories from './components/images/memories.png'
import Posts from "./components/Posts/Posts"
import Form from "./components/Forms/Form"
import styles from "./styles.module.css"
import { useDispatch } from 'react-redux'
import { getPosts } from './features/posts/postSlice'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [])
    return(
        <main>
            <header className={styles.memories}>
                <h1>Posts</h1>
                <img className={styles.memories_img} src={memories} alt="memories"></img>
            </header>
            <section className={styles.posts}>
                <Posts></Posts>
                <Form></Form>
            </section>
        </main>
    )
}

export default App