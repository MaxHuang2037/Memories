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
        navigate(`/search?searchQuery=${search.searchQuery || "none"}&tags=${search.tags}`)
        console.log(search)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <input className={styles.input} placeholder="Title" onChange={(e) => setSearch({...search, searchQuery: e.target.value})}></input>
            <input className={styles.input} placeholder="Tags (comma seperated)" onChange={(e) => setSearch({...search, tags: e.target.value.split(",").map((tag) => `${tag.trim()}`).join(",")})}></input>
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchForm