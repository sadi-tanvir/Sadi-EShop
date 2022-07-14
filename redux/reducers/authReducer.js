import { createReducer } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    isAuthenticate: false,
    isAdmin: false,
    userInfo: {},
    accessToken: ""
}


const authReducer = createReducer(initialState, {
    loginUser: (state, action) => {
        state.isAuthenticate = true
    },
    accessAdmin: (state, action) => {
        state.isAdmin = true
    },
    logOutUser: (state, action) => {
        state.isAuthenticate = false
        state.isLoading = false
        state.isAdmin = false
        state.userInfo = {}
        state.accessToken = ""
    },
    userInfo: (state, action) => {
        state.userInfo = action.payload
    },
    accessToken: (state, action) => {
        state.accessToken = action.payload
    }
})

export default authReducer