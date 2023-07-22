import { useState } from "react"
import Input from "./Input"
import styles from "./styles.module.css"
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode"

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setSignUp] = useState(false)

    const handleSubmit = (e) => {
        
    }

    const switchMode = (e) => {
        e.preventDefault()
        setSignUp((prev) => !prev)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const data = jwt_decode(res.credential)
        localStorage.setItem("profile", JSON.stringify({...data, token: res.credential}))
        window.location.href = "/"
    }

    const googleError = (err) => {
        console.log("Google Sign In was unsuccessful")
    }

    return(
        <section>
            <h1>{isSignup ? "Sign Up" : "Sign In"}</h1>
            <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
                { isSignup && (
                    <>
                        <Input name="First Name"></Input>
                        <Input name="Last Name"></Input>
                    </>
                )}
                <Input name="Email"></Input>
                <Input name="Password" setShowPassword={setShowPassword} type={showPassword ? "text" : "password"}></Input>
                { isSignup && <Input name="Confirm Password" type="password"></Input>}
                <button className={styles.submit_btn} type="submit">
                    {isSignup ? "Sign Up" : "Sign In"}
                </button>
                <GoogleLogin onSuccess={googleSuccess} onError={googleError}/>
                <button onClick={switchMode}>
                    {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </button>
            </form>
        </section>
    )
}

export default Auth