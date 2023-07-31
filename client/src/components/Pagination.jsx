import {useSelector} from "react-redux"
import styles from "./styles.module.css"

const Paginate = ({setSearchParams, searchParams, search}) => {
    const {totalPages, currentPage} = useSelector((state) => state.post)

    const navigate = (page) => {
        if(search) return setSearchParams({page: page, searchQuery: searchParams.get("searchQuery"), tags: searchParams.get("tags")})

        setSearchParams({page: page})
    }
    return (
        <footer className={styles.pagination}>
            <button className={styles.pagination_btn} onClick={() => currentPage !== 1 && navigate(1)}>First</button>
            <button className={styles.pagination_btn} onClick={() => currentPage - 1 >= 1 && navigate(currentPage - 1)}>Previous</button>
            <button className={styles.pagination_btn}>{currentPage}/{totalPages}</button>
            <button className={styles.pagination_btn} onClick={() => currentPage + 1 <= totalPages && navigate(currentPage + 1)}>Next</button>
            <button className={styles.pagination_btn} onClick={() => currentPage !== totalPages && navigate(totalPages)}>Last</button>
        </footer>
    )
}

export default Paginate