import {configureStore} from "@reduxjs/toolkit"
import productsReducer from "./reducers/productsReducer"
import authReducer from "./reducers/authReducer"

const store = configureStore({
    reducer: {
        productsReducer,
        authReducer
    }
})

export default store