import { useState } from "react"
import FileBase from "react-file-base64"
import styles from "./style.module.css"
import { useDispatch } from "react-redux"
import { editProfile } from "../../features/users/userSlice"

const Profile = ({user, setUser}) => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        name: user?.result.name, email: user?.result.email, picture: user?.result.picture
    })
    
    if(user === null){
        window.location.href = "/"
    }
        
    const handleSubmit = async (e) =>{
        e.preventDefault()
        await dispatch(editProfile(userData))
        setUser(JSON.parse(localStorage.getItem("profile")))
    }

    return(
        <form onSubmit={handleSubmit} className={styles.container}>
            <section className={styles.img_section}>
                <img className={styles.pfp} src={userData.picture} alt="pfp"></img>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64}) => setUserData({...userData, picture: base64})}>
                </FileBase>
            </section>
            <section className={styles.info}>
                <h2>Edit profile</h2>
                <label className={styles.label}>Name</label>
                <input className={styles.input} value={userData.name} placeholder="Name" onChange={(e) => setUserData({...userData, name: e.target.value})}></input>
                <label className={styles.label}>Email</label>
                <input disabled={user?.result?.password === undefined} className={styles.input} value={userData.email} placeholder="Email" onChange={(e) => setUserData({...userData, email: e.target.value})}></input>    
                <button className={styles.submit_btn} type="submit">Save Changes</button>
            </section>
        </form>
    )
}

export default Profile