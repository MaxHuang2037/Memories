import { useState } from "react"
import { GoogleLogin } from "@react-oauth/google"
import Input from "./Input"
import styles from "./styles.module.css"
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux"
import { signIn, signUp } from "../../features/users/userSlice"

const initialState = {firstName: "", lastName: "", email: "", password: "", confirmPassword: ""}

const Auth = () => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup) {
            dispatch(signUp(formData))
        } else {
            dispatch(signIn(formData))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
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
                        <Input placeholder="First Name" handleChange={handleChange} name="firstName"></Input>
                        <Input placeholder="Last Name" handleChange={handleChange} name="lastName"></Input>
                    </>
                )}
                <Input placeholder="Email" handleChange={handleChange} name="email"></Input>
                <Input placeholder="Password" handleChange={handleChange} name="password" setShowPassword={setShowPassword} type={showPassword ? "text" : "password"}></Input>
                { isSignup && <Input placeholder="Confirm Password" handleChange={handleChange} name="confirmPassword" type="password"></Input>}
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