import styles from "./styles.module.css"

const Input = ({name, type, setShowPassword, placeholder, handleChange}) => {
    const handlePassword = (e) => {
        e.preventDefault()
        setShowPassword((prev) => !prev)
    }

    return(
        <>
            <input 
                required
                className={styles.input}
                placeholder={placeholder}
                name={name}
                onChange={handleChange}
                type={type}
            ></input>
            {name === "password" && <button onClick={handlePassword}>Show Password</button> }
        </>
    )
}

export default Input