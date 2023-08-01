import styles from "./styles.module.css"

const Input = ({name, type, setShowPassword, placeholder, handleChange}) => {
    const handlePassword = () => {
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
            {name === "password" && <button onClick={handlePassword} type="button">Show Password</button> }
        </>
    )
}

export default Input