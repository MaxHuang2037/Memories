import styles from "./styles.module.css"

const Input = ({name, type, setShowPassword}) => {
    const handleChange = (e) => {
        
    }

    const handlePassword = (e) => {
        e.preventDefault()
        setShowPassword((prev) => !prev)
    }

    return(
        <>
            <input 
                required
                className={styles.input}
                placeholder={name}
                // value={null}
                onChange={handleChange}
                type={type}
            ></input>
            {name === "Password" && <button onClick={handlePassword}>Show Password</button> }
        </>
    )
}

export default Input