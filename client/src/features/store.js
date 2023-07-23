import {configureStore} from "@reduxjs/toolkit"
import postReducer from "./posts/postSlice"
import userReducer from "./users/userSlice"

export const store = configureStore({
    reducer: {
        post: postReducer,
        user: userReducer
    }
})