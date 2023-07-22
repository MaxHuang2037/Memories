import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isLoading: false
}

const usersSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        
    }
})