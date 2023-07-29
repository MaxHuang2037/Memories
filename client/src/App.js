import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import { Routes, Route, redirect } from "react-router-dom"
import {GoogleOAuthProvider} from "@react-oauth/google"
import { useEffect, useState } from "react"

import styles from "./styles.module.css"

const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [])

    return (
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
            <main className={styles.main}>
                <Navbar user={user} setUser={setUser}/>
                <Routes>
                    <Route path="/" element={<Home user={user}/> }/>
                    <Route path="/auth" element={<Auth/>}/>
                </Routes>
            </main>
        </GoogleOAuthProvider>
    )
}

export default App