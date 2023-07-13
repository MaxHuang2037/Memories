import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("post/getPosts", async () => {
    try {
        const res = await fetch("/posts/")
        return await res.json()
    } catch (err) {
        console.log(err.message)
    }
})

export const createPost = createAsyncThunk("post/createPost", async (data) => {
    try {
        const res = await fetch("/posts/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
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
        builder.addCase(getPosts.fulfilled, (state, {payload}) => {
            state.posts = payload
        })
        .addCase(createPost.fulfilled, (state, {payload}) => {
            state.posts = [...state.posts, payload]
        })
    }
})

export default postSlice.reducer