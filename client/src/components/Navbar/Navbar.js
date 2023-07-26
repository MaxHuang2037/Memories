import { useEffect } from "react"
import memories from "../images/posts.png"
import styles from "./styles.module.css"
import {Link} from "react-router-dom"
import jwt_decode from "jwt-decode"

const Navbar = ({user, setUser}) => {
    const logOut = () => {
        localStorage.clear()
        setUser(null)
    }

    useEffect(() => {
        // jwt 
        const token = user?.token
        if(token){
            const decodedToken = jwt_decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) logOut()
        }
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
                        <h1 className={styles.username}>{user.result.name}</h1>
                        <img className={styles.pfp} alt={user.result.name} src={user.result.picture}></img>
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