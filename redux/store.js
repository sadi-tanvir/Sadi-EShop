import {configureStore} from "@reduxjs/toolkit"
import productsReducer from "./reducers/productsReducer"
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import authReducer from "./reducers/authReducer"

const store = configureStore({
    reducer: {
        productsReducer,
        authReducer
    }
})

const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export default wrapper