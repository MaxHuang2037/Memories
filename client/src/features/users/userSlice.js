import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
        console.log(user)
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

export const getUsers = createAsyncThunk("users/signIn", 
    async () => {
        try {
            // const res = await fetch("/posts")
            // return await res.json()
        } catch (err) {
            console.log(err.message)
        }
    }
)

const initialState = {
    users: [],
    isLoading: false
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
    }
})

export default userSlice.reducer