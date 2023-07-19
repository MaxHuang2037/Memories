import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import { Routes, Route } from 'react-router-dom'

import styles from "./styles.module.css"

const App = () => {
    return (
        <main className={styles.main}>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
            </Routes>
        </main>
    )
}

export default App