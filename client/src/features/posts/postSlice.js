import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("post/getPosts", 
    async () => {
        try {
            const res = await fetch("/posts")
            return await res.json()
        } catch (err) {
            console.log(err.message)
        }
    }
)

export const createPost = createAsyncThunk("post/createPost", 
    async (data) => {
        try {
            const res = await fetch("/posts", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
                },
                body: JSON.stringify(data)
            })
            return await res.json()
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const deletePost = createAsyncThunk("post/deletePost", 
    async (id) => {
        try {
            const res = await fetch("/posts", {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
                },
                body: JSON.stringify({id})
            })
            return await res.json()
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const updatePost = createAsyncThunk("post/updatePost", 
    async (data) => {
        try {
            const res = await fetch(`/posts/${data.id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
                },
                body: JSON.stringify(data.post)
            })
            return await res.json()
        } catch (error) {
            console.log(error.message)
        }
    }
)

const initialState = {
    posts: [],
    currentPostId: null,
    isLoading: false
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setCurrentPostId: (state, {payload}) => {
            state.currentPostId = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, {payload}) => {
            state.posts = payload
        })
        .addCase(createPost.fulfilled, (state, {payload}) => {
            state.posts = [...state.posts, payload]
        })
        .addCase(deletePost.fulfilled, (state, {payload}) => {
            state.posts = state.posts.filter((post) => (payload._id !== post._id))
        })
        .addCase(updatePost.fulfilled, (state, {payload}) => {
            state.posts = state.posts.map((post) => post._id === payload._id ? payload : post)
        })
    }
})

export default postSlice.reducer
export const {setCurrentPostId} = postSlice.actions