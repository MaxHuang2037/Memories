import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import { Routes, Route } from "react-router-dom"
import {GoogleOAuthProvider} from "@react-oauth/google"

import styles from "./styles.module.css"

const App = () => {
    return (
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
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