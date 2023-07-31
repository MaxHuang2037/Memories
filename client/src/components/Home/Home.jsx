import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getPosts, getPostsBySearch } from "../../features/posts/postSlice"

import Posts from "../Posts/Posts"
import PostForm from "../Forms/PostForm"
import styles from "./styles.module.css"
import { useSearchParams } from "react-router-dom"
import Paginate from "../Pagination"
import SearchForm from "../Search/Searchform"

const Home = ({user, search}) => {
    const dispatch = useDispatch()
    const [currentPostId, setCurrentPostId] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if(search){
            dispatch(getPostsBySearch({page: searchParams.get("page"), searchQuery: searchParams.get("searchQuery"), tags: searchParams.get("tags")}))
        } else{
            dispatch(getPosts(searchParams.get("page")))
        }
    }, [searchParams])

    return(
        <>
            <section className={styles.posts}>
                <Posts user={user} currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>
                <div className={styles.forms}>
                    <SearchForm/>
                    <PostForm user={user} currentPostId={currentPostId} setCurrentPostId={setCurrentPostId}/>
                </div>
            </section>
            <Paginate setSearchParams={setSearchParams} searchParams={searchParams} search={search}></Paginate>
        </>
    )
}

export default Home