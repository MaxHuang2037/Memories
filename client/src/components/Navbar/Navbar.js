import memories from '../images/posts.png'
import styles from './styles.module.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
    const user = null

    return (
        <header className={styles.navbar}>
            <div className={styles.brand}>
                <Link className={styles.home} to="/">
                    <button>Posts</button>
                </Link>
                <img className={styles.navbar_img} src={memories} alt="memories"></img>
            </div>
            <div className={styles.toolbar}>
                {user ? 
                    <div>
                        <img alt={user.result.name} src={user.result.imageURL}></img>
                        <h1>{user.result.name}</h1>
                        <button>Log Out</button>
                    </div> :
                    <Link to="/auth">
                        <button>Sign In</button>
                    </Link>
                }
            </div>
        </header>
    )
}

export default Navbar