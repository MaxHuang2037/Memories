import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem("profile"))?.token

export const signIn = createAsyncThunk("users/signIn", 
    async ({email, password}) => {
        try {
            const res = await fetch("/users/signIn", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password})
            })
            return await res.json()
        } catch (err) {
            console.log(err.message)
        }
    }
)

export const signUp = createAsyncThunk("users/signUp", 
    async (user) => {
        try {
            const res = await fetch("/users/signUp", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            return await res.json()
        } catch (err) {
            console.log(err.message)
        }
    }
)

export const editProfile = createAsyncThunk("users/editProfile", 
    async (data) => {
        try {
            const res = await fetch("/users/editProfile", {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            return await res.json()
        } catch (err) {
            console.log(err.message)
        }
    }
)

const initialState = {

}

const userSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, {payload}) => {
            if(payload.message){
                return window.alert(payload.message)
            }
            localStorage.setItem("profile", JSON.stringify(payload))
            window.location.href = "/"
        })
        .addCase(signUp.fulfilled, (state, {payload}) => {
            if(payload.message){
                return window.alert(payload.message)
            }
            localStorage.setItem("profile", JSON.stringify(payload))
            window.location.href = "/"
        })
        .addCase(editProfile.fulfilled, (state, {payload}) => {
            if(payload.message){
                return window.alert(payload.message)
            }
            localStorage.setItem("profile", JSON.stringify({token: token, result: payload}))
        })
    }
})

export default userSlice.reducer