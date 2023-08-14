import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import SinglePost from "./components/SinglePost/SinglePost"
import Profile from "./components/Profile/Profile"
import { Routes, Route } from "react-router-dom"
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
                    <Route path="/" element={<Home user={user}/>}/>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="/posts/search" element={<Home user={user} search={true}/>}/>
                    <Route path="/posts/:id" element={<SinglePost user={user}></SinglePost>}/>
                    <Route path="/profile/:uid" element={<Profile user={user} setUser={setUser}/>}/>
                </Routes>
            </main>
        </GoogleOAuthProvider>
    )
}

export default App