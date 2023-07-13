import {configureStore} from "@reduxjs/toolkit"
import postReducer from "./posts/postSlice"

export const store = configureStore({
    reducer: {
        post: postReducer
    }
})