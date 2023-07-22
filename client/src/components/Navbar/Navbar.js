import { useEffect, useState } from "react"
import memories from "../images/posts.png"
import styles from "./styles.module.css"
import {Link} from "react-router-dom"

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    
    const logOut = () => {
        localStorage.clear()
        setUser(null)
    }

    useEffect(() => {
        // const token = user.token

        // jwt 
        console.log(user)
        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [])

    return (
        <header className={styles.navbar}>
            <div className={styles.brand}>
                <Link to="/">
                    <button className={styles.home}>Posts</button>
                </Link>
                <img className={styles.navbar_img} src={memories} alt="memories"></img>
            </div>
            <div className={styles.toolbar}>
                {user ? 
                    <div className={styles.loggedIn}>
                        <h1 className={styles.username}>{user.name}</h1>
                        <img className={styles.pfp} alt={user.name} src={user.picture}></img>
                        <button onClick={logOut} className={styles.log_btn}>Log Out</button>
                    </div> :
                    <Link to="/auth">
                        <button className={styles.log_btn}>Sign In</button>
                    </Link>
                }
            </div>
        </header>
    )
}

export default Navbar