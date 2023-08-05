import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem("profile"))?.token

export const getPostsBySearch = createAsyncThunk("post/getPostsBySearch", 
    async ({page, searchQuery, tags}) => {
        try {
            const res = await fetch(`/posts/search?page=${page}&searchQuery=${searchQuery}&tags=${tags}`)
            return await res.json()
        } catch (err) {
            console.log(err.message)
        }
    }
)

export const getPosts = createAsyncThunk("post/getPosts", 
    async (page) => {
        try {
            const res = await fetch(`/posts?page=${page}`)
            return await res.json()
        } catch (err) {
            console.log(err.message)
        }
    }
)

export const getPost = createAsyncThunk("post/getPost", 
    async (id) => {
        try {
            const res = await fetch(`/posts/${id}`)
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
                    "authorization": `Bearer ${token}`
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
                    "authorization": `Bearer ${token}`
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
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data.post)
            })
            return await res.json()
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const likePost = createAsyncThunk("post/likePost", 
    async ({id, likeCount}) => {
        try {
            const res = await fetch(`/posts/${id}/likePost`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({likeCount})
            })
            return await res.json()
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const commentPost = createAsyncThunk("post/commentPost", 
    async ({id, comments}) => {
        console.log(token)
        try {
            const res = await fetch(`/posts/${id}/commentPost`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({comments})
            })
            return await res.json()
        } catch (error) {
            console.log(error.message)
        }
    }
)

const initialState = {
    posts: [],
    totalPages: 0,
    currentPage: 1,
    isLoading: false,
    isLoadingSinglePost: false,
    singlePost: {}
}

const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, {payload}) => {
            state.posts = payload.data
            state.totalPages = payload.totalPages
            state.currentPage = payload.currentPage
            state.isLoading = false
            window.scrollTo(0, 0)
        })
        .addCase(getPostsBySearch.fulfilled, (state, {payload}) => {
            state.posts = payload.data
            state.totalPages = payload.totalPages
            state.currentPage = payload.currentPage
            state.isLoading = false
            window.scrollTo(0, 0)
        })
        .addCase(getPost.fulfilled, (state, {payload}) => {
            state.singlePost = payload
            console.log(state.singlePost)
            state.isLoadingSinglePost = false
        })
        .addCase(createPost.fulfilled, (state, {payload}) => {
            state.posts = [...state.posts, payload]
            window.location.reload(false)
                
        })
        .addCase(deletePost.fulfilled, (state, {payload}) => {
            state.posts = state.posts.filter((post) => (payload._id !== post._id))
        })
        .addCase(updatePost.fulfilled, (state, {payload}) => {
            state.posts = state.posts.map((post) => post._id === payload._id ? payload : post)
        })
        .addCase(likePost.fulfilled, (state, {payload}) => {
            state.posts = state.posts.map((post) => post._id === payload._id ? payload : post)
        })
        .addCase(commentPost.fulfilled, (state, {payload}) => {
            state.singlePost = payload
        })
        .addCase(getPosts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getPostsBySearch.pending, (state) => {
            state.isLoading = true
        })
    }
})

export default postSlice.reducer