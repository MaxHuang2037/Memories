import { useState } from "react"
import Input from "./Input"
import styles from "./styles.module.css"
import { GoogleLogin, googleLogout } from '@react-oauth/google'

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
                <button onClick={switchMode}>
                    {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </button>
                <GoogleLogin></GoogleLogin>
            </form>
        </section>
    )
}

export default Auth