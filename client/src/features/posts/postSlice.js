import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("post/getPosts", async () => {
    try {
        const res = await fetch("/post")
        return await res.json()
    } catch (error) {
        console.log(error.message)
    }
})

const initialState = {
    posts: [],
    isLoading: false
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state, {payload}) => {
            
        })
    }
})

export default postSlice.reducer