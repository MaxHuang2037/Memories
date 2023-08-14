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
        return(
            <h1>please sign in</h1>
        )
    }
        
    const handleSubmit = async (e) =>{
        e.preventDefault()
        await dispatch(editProfile(userData))
        setUser(JSON.parse(localStorage.getItem("profile")))
    }

    return(
        <form onSubmit={handleSubmit} className={styles.container}>
            <img src={userData.picture} alt="pfp"></img>
            <FileBase
                type="file"
                multiple={false}
                onDone={({base64}) => setUserData({...userData, picture: base64})}>
            </FileBase>
            <input value={userData.name} placeholder="Name" onChange={(e) => setUserData({...userData, name: e.target.value})}></input>
            <input value={userData.email} placeholder="Email" onChange={(e) => setUserData({...userData, email: e.target.value})}></input>    
            <button type="submit">Submit Changes</button>
        </form>
    )
}

export default Profile