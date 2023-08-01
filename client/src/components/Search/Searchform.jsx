import { useNavigate } from "react-router-dom"
import { useState } from "react"
import styles from "./styles.module.css"

const SearchForm = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState({
        searchQuery: "", tags: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const tags = search.tags.split(",").map((tag) => `${tag.trim()}`).join(",")
        navigate(`/search?searchQuery=${search.searchQuery || "none"}&tags=${tags || "none"}`)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <h2>Search</h2>
            <input className={styles.input} placeholder="Title" onChange={(e) => setSearch({...search, searchQuery: e.target.value})}></input>
            <input className={styles.input} placeholder="Tags (comma seperated)" onChange={(e) => setSearch({...search, tags: e.target.value})}></input>
            <button className={styles.search_btn} type="submit">Search</button>
        </form>
    )
}

export default SearchForm