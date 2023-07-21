import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import { Routes, Route } from 'react-router-dom'
import {GoogleOAuthProvider} from "@react-oauth/google"
import dotenv from "dotenv"

import styles from "./styles.module.css"

dotenv.config()
const App = () => {
    return (
        <GoogleOAuthProvider clientId={`${process.env.GOOGLE_API_TOKEN}`}>
            <main className={styles.main}>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/auth" element={<Auth/>}/>
                </Routes>
            </main>
        </GoogleOAuthProvider>
    )
}

export default App