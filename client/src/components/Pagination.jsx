import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"

const Paginate = () => {
    const {totalPages, currentPage} = useSelector((state) => state.post)
    const redirect = useNavigate()

    const navigate = (page) => {
        redirect(`/?page=${page}`)
    }
    return (
        <footer className={styles.pagination}>
            <button className={styles.pagination_btn} onClick={() => currentPage != 1 && navigate(1)}>First</button>
            <button className={styles.pagination_btn} onClick={() => currentPage - 1 >= 1 && navigate(currentPage - 1)}>Previous</button>
            <button className={styles.pagination_btn}>{currentPage}</button>
            <button className={styles.pagination_btn} onClick={() => currentPage + 1 <= totalPages && navigate(currentPage + 1)}>Next</button>
            <button className={styles.pagination_btn} onClick={() => currentPage != totalPages && navigate(totalPages)}>Last</button>
        </footer>
    )
}

export default Paginate